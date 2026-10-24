import { Router } from "express";
import { defaultPlanCatalog, loginSchema, registerSchema } from "@takiia/shared";
import type { ApiEnv } from "../env.js";
import { createSessionToken, hashIp, hashPassword, hashToken, slugify, verifyPassword } from "../lib/crypto.js";
import { handleZod, publicUser, sendError } from "../lib/http.js";
import { prisma } from "../lib/prisma.js";
import type { AuthedRequest } from "../middleware/auth.js";
import { attachCsrfCookie, cookieOptions, SESSION_COOKIE } from "../middleware/security.js";

const SESSION_DAYS = 14;

async function loadUserFromCookie(req: AuthedRequest) {
  const token = req.cookies?.[SESSION_COOKIE] as string | undefined;
  if (!token) {
    return null;
  }
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true }
  });
  if (!session || session.expiresAt.getTime() < Date.now()) {
    return null;
  }
  req.user = session.user;
  req.sessionToken = token;
  return session.user;
}

export function authRouter(env: ApiEnv) {
  const router = Router();

  router.post("/register", async (req, res) => {
    try {
      const input = registerSchema.parse(req.body);
      const existing = await prisma.user.findUnique({ where: { email: input.email } });
      if (existing) {
        return sendError(res, 409, "An account with this email already exists");
      }

      const passwordHash = await hashPassword(input.password);
      const token = createSessionToken();
      const workspaceName = input.workspaceName ?? `${input.displayName}'s workspace`;

      const starter = await prisma.plan.upsert({
        where: { key: "starter" },
        update: {},
        create: {
          key: "starter",
          name: defaultPlanCatalog.starter.name,
          description: defaultPlanCatalog.starter.description,
          membersLimit: defaultPlanCatalog.starter.limits.members,
          socialAccountsLimit: defaultPlanCatalog.starter.limits.socialAccounts,
          scheduledPostsPerMonth: defaultPlanCatalog.starter.limits.scheduledPostsPerMonth,
          storageMb: defaultPlanCatalog.starter.limits.storageMb,
          meetingsPerMonth: defaultPlanCatalog.starter.limits.meetingsPerMonth
        }
      });

      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email: input.email,
            passwordHash,
            displayName: input.displayName
          }
        });

        const workspace = await tx.workspace.create({
          data: {
            name: workspaceName,
            slug: slugify(workspaceName),
            members: {
              create: { userId: user.id, role: "owner" }
            },
            subscription: {
              create: {
                planId: starter.id,
                status: "incomplete",
                provider: env.PAYMENTS_ENABLED ? "stripe" : null
              }
            }
          }
        });

        await tx.session.create({
          data: {
            userId: user.id,
            tokenHash: hashToken(token),
            expiresAt: new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000),
            userAgent: req.get("user-agent")?.slice(0, 240),
            ipHash: hashIp(req.ip ?? "0.0.0.0", env.SESSION_SECRET)
          }
        });

        await tx.auditEvent.create({
          data: {
            workspaceId: workspace.id,
            actorId: user.id,
            action: "user.registered"
          }
        });

        return { user, workspace };
      });

      res.cookie(SESSION_COOKIE, token, cookieOptions(env, { maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000 }));
      const csrf = attachCsrfCookie(res, env, token);
      return res.status(201).json({
        user: publicUser(result.user),
        workspace: { id: result.workspace.id, name: result.workspace.name },
        csrfToken: csrf
      });
    } catch (error) {
      return handleZod(res, error);
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const input = loginSchema.parse(req.body);
      const user = await prisma.user.findUnique({ where: { email: input.email } });
      if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
        return sendError(res, 401, "Invalid email or password");
      }

      const token = createSessionToken();
      await prisma.session.create({
        data: {
          userId: user.id,
          tokenHash: hashToken(token),
          expiresAt: new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000),
          userAgent: req.get("user-agent")?.slice(0, 240),
          ipHash: hashIp(req.ip ?? "0.0.0.0", env.SESSION_SECRET)
        }
      });

      res.cookie(SESSION_COOKIE, token, cookieOptions(env, { maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000 }));
      const csrf = attachCsrfCookie(res, env, token);
      return res.json({ user: publicUser(user), csrfToken: csrf });
    } catch (error) {
      return handleZod(res, error);
    }
  });

  router.post("/logout", async (req: AuthedRequest, res) => {
    const token = req.cookies?.[SESSION_COOKIE] as string | undefined;
    if (token) {
      await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
    }
    res.clearCookie(SESSION_COOKIE, cookieOptions(env));
    res.clearCookie("takiia_csrf", { ...cookieOptions(env), httpOnly: false });
    return res.json({ ok: true });
  });

  router.get("/me", async (req: AuthedRequest, res) => {
    const user = await loadUserFromCookie(req);
    if (!user) {
      return sendError(res, 401, "Authentication required");
    }
    const csrf = attachCsrfCookie(res, env, req.sessionToken ?? "");
    return res.json({ user: publicUser(user), csrfToken: csrf });
  });

  return router;
}
