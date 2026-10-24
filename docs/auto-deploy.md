# Takiia automatic GitHub-to-VPS deployment

Normal website updates: edit in Cursor, commit, push `main`. GitHub Actions runs CI, then deploys that exact commit over SSH as user `takiia`.

**Auto-deploy stays off until launch is confirmed.** Pushing `main` will run CI, but **Production deploy** exits at the launch gate unless both of these exist:

1. Repository variable `TAKIIA_LAUNCH_READY` = `yes` (Settings → Secrets and variables → Actions → Variables).
2. VPS file `/srv/apps/takiia/.launch-ready` owned by `takiia`, containing only the word `ready`.

Do not set either until the SSH diagnostic has passed on GitHub, both production env files exist, and you have reviewed the launch checklist. The **SSH diagnostic** workflow does not use this gate.

Schema changes are never automatic. Use the manual `Production deploy` workflow with `run_migrations=yes` and the `production-migrate` environment.

## GitHub configuration

Create two Environments on the repository:

- `production` — automatic deploys after CI on `main`
- `production-migrate` — required reviewers for Prisma migrations

Add these secrets to **both** environments. Do not store them in the repository.

| Secret | Value |
| --- | --- |
| `TAKIIA_DEPLOY_HOST` | `200.97.170.235` |
| `TAKIIA_DEPLOY_USER` | `takiia` |
| `TAKIIA_DEPLOY_SSH_KEY` | Private key created only for GitHub Actions → VPS |
| `TAKIIA_DEPLOY_KNOWN_HOSTS` | Independently verified `ssh-ed25519` or RSA host line for `200.97.170.235` |

Do not reuse the server-to-GitHub read-only deploy key. Do not paste `ssh-keyscan` output without comparing it to a host key you already trust.

## One-time VPS bootstrap

On the VPS, as root, create a GitHub-only key **on your laptop**, then install only the public half:

```bash
# On your workstation, not in this repository:
ssh-keygen -t ed25519 -f takiia-github-deploy -C "github-actions-takiia" -N ""
```

Verify the VPS host key from a trusted session you already use:

```bash
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Put that public host key into `TAKIIA_DEPLOY_KNOWN_HOSTS` in the form:

`200.97.170.235 ssh-ed25519 AAAA...`

Install the matching public key for user `takiia` only:

```bash
sudo -u takiia -H install -m 700 -d /home/takiia/.ssh
sudo -u takiia -H sh -c 'touch /home/takiia/.ssh/authorized_keys && chmod 600 /home/takiia/.ssh/authorized_keys'
# append only the GitHub Actions public key, then:
sudo -u takiia -H chmod 600 /home/takiia/.ssh/authorized_keys
```

Optional SSH hardening for that key: `command="/srv/apps/takiia/scripts/deploy/actions-deploy.sh"` is too strict because the workflow passes environment variables. Keep the key limited to user `takiia` with no sudo.

Also required once:

```bash
sudo install -d -o takiia -g takiia -m 700 /var/backups/takiia
sudo bash /srv/apps/takiia/scripts/deploy/setup-production-env.sh
sudo -u takiia -H test -d /home/takiia/.pm2 || sudo -u takiia -H env PM2_HOME=/home/takiia/.pm2 pm2 ping
```

Do not run `pm2 startup` unless you separately approve a `takiia`-only systemd unit. Do not touch root's PM2 daemon.

## First live deployment

1. Push this pipeline to `main` from Cursor after you approve the commit.
2. Confirm the **CI** workflow is green for that commit.
3. Confirm Environments and secrets exist.
4. Run **SSH diagnostic** (workflow_dispatch only) and wait for `SSH_TEST_OK`.
5. Finish VPS env bootstrap and the rest of `docs/launch.md` before opening the gate.
6. Only then set `TAKIIA_LAUNCH_READY=yes` and write `/srv/apps/takiia/.launch-ready`.
7. Either wait for **Production deploy** to start from `workflow_run`, or run it manually with `run_migrations=no`.
8. Open the Actions log and confirm it printed the approved 40-character SHA and finished `verify-health`.

Initial empty `takiia_db` needs a **manual** migration workflow (`run_migrations=yes`) after a reviewer approves `production-migrate`. Automatic pushes will not apply migrations.

## Future website updates

1. Edit in Cursor.
2. Commit and push `main`.
3. Watch **CI**, then **Production deploy**.
4. No VPS terminal is required for ordinary frontend/API code.

## Manual migration

Actions → **Production deploy** → Run workflow:

- `git_sha`: the CI-green commit
- `run_migrations`: `yes`

That job uses environment `production-migrate`. It still backs up only `takiia_db`, then `prisma migrate deploy`. It never runs `migrate reset` or `db push`.

## Nginx, DNS, TLS

Not changed by this pipeline. Public DNS currently points at Cloudflare anycast, not `200.97.170.235`. See `docs/launch.md` before touching records, Nginx, or Certbot.

## Troubleshooting

| Stage | What to check |
| --- | --- |
| CI failed | Actions **CI** log. Fix lint/tests/build locally with `npm ci` and the same scripts. |
| Deploy skipped | CI must succeed on `main`. PRs do not deploy. |
| SSH failed | Environment secrets, `takiia` authorized_keys, and `TAKIIA_DEPLOY_KNOWN_HOSTS`. Host checking stays on. |
| Backup failed | `/var/backups/takiia` exists and is writable by `takiia`. API `.env` points at `takiia_db`. |
| Build failed | Node on the VPS, `npm ci` under `/srv/apps/takiia`, disk space. Running Takiia processes are rolled back to the previous commit when health fails after reload. |
| Health failed | `curl -fsS http://127.0.0.1:3033/health` and `:3034` as `takiia`. Check only `takiia-api` / `takiia-web` in `/home/takiia/.pm2`. |

If a migration ran and health still failed, restore **only** `takiia_db` from the backup printed as an archive path, then reload the rolled-back Takiia processes.
