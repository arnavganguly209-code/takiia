import { z } from "zod";
import { conversationKinds, socialProviders, workspaceRoles } from "./types.js";

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address.")
  .max(254);

export const passwordSchema = z
  .string()
  .min(12, "Use at least 12 characters.")
  .max(128, "Password is too long.")
  .regex(/[A-Za-z]/, "Include a letter.")
  .regex(/[0-9]/, "Include a number.");

export const displayNameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters.")
  .max(80, "Name is too long.");

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  displayName: displayNameSchema,
  workspaceName: z.string().trim().min(2).max(80).optional()
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required.").max(128)
});

export const profileUpdateSchema = z.object({
  displayName: displayNameSchema
});

export const workspaceCreateSchema = z.object({
  name: z.string().trim().min(2).max(80)
});

export const workspaceInviteSchema = z.object({
  email: emailSchema,
  role: z.enum(workspaceRoles).default("member")
});

export const conversationCreateSchema = z.object({
  kind: z.enum(conversationKinds),
  title: z.string().trim().min(1).max(120).optional(),
  memberIds: z.array(z.string().cuid()).min(1).max(50)
});

export const messageCreateSchema = z.object({
  body: z.string().trim().min(1).max(8000)
});

export const meetingCreateSchema = z.object({
  title: z.string().trim().min(2).max(120),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime().optional()
});

export const scheduledPostCreateSchema = z.object({
  provider: z.enum(socialProviders),
  body: z.string().trim().min(1).max(2200),
  scheduledFor: z.string().datetime()
});

export const contactSchema = z.object({
  name: displayNameSchema,
  email: emailSchema,
  topic: z.enum(["sales", "support", "security", "other"]),
  message: z.string().trim().min(10).max(4000)
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
