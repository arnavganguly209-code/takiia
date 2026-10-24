# Takiia first production launch

This is the operator runbook. GitHub Actions will not change DNS, Nginx, or certificates.

**Current public DNS (verified 2026-10-24 from this workstation):**

| Name | Observed type | Observed value | Intended |
| --- | --- | --- | --- |
| `takiia.com` | A + AAAA | Cloudflare `104.21.83.241`, `172.67.183.119`, `2606:4700:...` | A `@` → `200.97.170.235` |
| `www.takiia.com` | A + AAAA | Same Cloudflare anycast | CNAME `www` → `takiia.com` or same VPS A |
| `api.takiia.com` | A + AAAA | Same Cloudflare anycast | A `api` → `200.97.170.235` |

`https://takiia.com` currently serves an existing Next.js site through Cloudflare, not this VPS. Do not overwrite those records until you accept that cutover. If Cloudflare stays enabled, set the **origin** to `200.97.170.235` and keep proxy orange-cloud only after you understand TLS at Cloudflare versus origin certs. For Let's Encrypt HTTP-01 on this VPS, DNS must resolve to `200.97.170.235` on port 80 (grey-cloud / DNS-only, or disable the proxy).

Unrelated registrar records (MX, TXT, NS) must stay.

## 1. GitHub Environments

Repository → Settings → Environments:

- `production`
- `production-migrate` (Required reviewers enabled)

Secrets on **both**:

- `TAKIIA_DEPLOY_HOST` = `200.97.170.235`
- `TAKIIA_DEPLOY_USER` = `takiia`
- `TAKIIA_DEPLOY_SSH_KEY` = new Actions→VPS private key
- `TAKIIA_DEPLOY_KNOWN_HOSTS` = independently verified host key line

## 2. One-time SSH bootstrap

On a trusted laptop (do not commit the key):

```bash
ssh-keygen -t ed25519 -f takiia-github-deploy -C "github-actions-takiia" -N ""
```

On the VPS, from an already-trusted root session:

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
sudo -u takiia -H install -m 700 -d /home/takiia/.ssh
sudo -u takiia -H touch /home/takiia/.ssh/authorized_keys
sudo -u takiia -H chmod 600 /home/takiia/.ssh/authorized_keys
# append only takiia-github-deploy.pub
sudo stat -c '%U:%G %a %n' /home/takiia/.ssh /home/takiia/.ssh/authorized_keys
```

Confirm the GitHub→Git read-only deploy key is a **different** key. Actions user has no sudo.

```bash
sudo install -d -o takiia -g takiia -m 700 /var/backups/takiia
sudo bash /srv/apps/takiia/scripts/deploy/setup-production-env.sh
sudo stat -c '%U:%G %a %n' /srv/apps/takiia/apps/api/.env /srv/apps/takiia/apps/web/.env.production /root/takiia-db-credentials.txt
```

Do not `cat` those files.

## 3. DNS (manual registrar / Cloudflare)

Only after you choose to point this hostname at the new VPS:

1. Inventory current A/AAAA/CNAME and proxy status.
2. Remove or grey-cloud the Cloudflare A/AAAA that hide the origin if you need HTTP-01 on the VPS.
3. Set A `@` and A `api` to `200.97.170.235`.
4. Set CNAME `www` → `takiia.com` **or** A `www` → `200.97.170.235` if the provider forbids CNAME at that label.
5. Wait for propagation:

```bash
dig +short A takiia.com
dig +short A www.takiia.com
dig +short A api.takiia.com
```

Expected: `200.97.170.235` (or Cloudflare IPs only if you kept the proxy and configured the origin separately).

## 4. Nginx (Takiia file only)

```bash
sudo bash /srv/apps/takiia/scripts/deploy/nginx-preflight.sh
sudo mkdir -p /var/www/takiia-acme/.well-known/acme-challenge
sudo chown -R www-data:www-data /var/www/takiia-acme
# HTTP bootstrap first (certificates do not exist yet):
sudo cp /srv/apps/takiia/infra/nginx/takiia.http-acme.conf.example /etc/nginx/sites-available/takiia.conf
sudo ln -s /etc/nginx/sites-available/takiia.conf /etc/nginx/sites-enabled/takiia.conf
sudo nginx -t
# reload only after nginx -t succeeds
sudo systemctl reload nginx
```

If preflight reports a foreign `server_name`, stop.

## 5. Certificates

Do **not** run `certbot --nginx` (it can rewrite other sites).

```bash
sudo certbot certonly --webroot -w /var/www/takiia-acme \
  -d takiia.com -d www.takiia.com -d api.takiia.com
```

Use the `fullchain.pem` / `privkey.pem` paths Certbot prints. If the lineage directory is not `takiia.com`, edit those two paths in `infra/nginx/takiia.conf.example`, then:

```bash
sudo cp /etc/nginx/sites-available/takiia.conf /etc/nginx/sites-available/takiia.conf.http.bak
sudo cp /srv/apps/takiia/infra/nginx/takiia.conf.example /etc/nginx/sites-available/takiia.conf
sudo nginx -t && sudo systemctl reload nginx
sudo certbot renew --dry-run
```

Keep the existing Certbot timer. Code deploys never re-issue certificates.

## 6. Open the launch gate, then first code deploy (migrations off)

Auto-deploy is disabled until you set **both**:

```text
GitHub → Settings → Secrets and variables → Actions → Variables
Name: TAKIIA_LAUNCH_READY
Value: yes
```

```bash
# On the VPS, only after env files and the SSH diagnostic are verified:
printf 'ready\n' | sudo -u takiia tee /srv/apps/takiia/.launch-ready >/dev/null
sudo -u takiia chmod 600 /srv/apps/takiia/.launch-ready
```

1. Commit and push `main` after you approve the local diff.
2. Confirm **CI** is green for that SHA.
3. Confirm **SSH diagnostic** printed `SSH_TEST_OK`.
4. Confirm **Production deploy** ran for the same SHA (`run_migrations=no`).
4. On the VPS, as `takiia` only if Actions cannot reach the box yet:

```bash
sudo -u takiia -H curl -fsS http://127.0.0.1:3033/health
sudo -u takiia -H curl -fsS http://127.0.0.1:3033/ready
sudo -u takiia -H curl -fsS -o /dev/null http://127.0.0.1:3034
sudo -u takiia -H env PM2_HOME=/home/takiia/.pm2 pm2 describe takiia-api
sudo -u takiia -H env PM2_HOME=/home/takiia/.pm2 pm2 describe takiia-web
```

Do not run `pm2 restart all`.

## 7. First migration (gated)

Actions → **Production deploy** → `git_sha` = CI-green SHA, `run_migrations=yes`. Approve `production-migrate`. Then:

```bash
sudo -u takiia -H curl -fsS http://127.0.0.1:3033/ready
```

Never `prisma migrate reset` or `db push`.

## 8. Public verification

```bash
curl -I https://takiia.com
curl -I https://www.takiia.com
curl -fsS https://api.takiia.com/health
```

`www` must 301 to `https://takiia.com`. API health JSON `status` is `ok`.

## 9. Ordinary updates

Edit in Cursor → push `main` → CI → Production deploy. No VPS terminal.

Infrastructure, DNS, SSL, and migrations stay manual and protected.
