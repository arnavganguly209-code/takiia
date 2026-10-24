# Takiia security rules

- Never commit `.env`, `.env.local`, `.env.production`, keys, or dumps
- Commit only `.env.example` files with placeholders
- `NEXT_PUBLIC_*` values are public. They must not contain secrets
- Production API binds `127.0.0.1:3033`
- Production web binds `127.0.0.1:3034`
- CORS allows the configured web origin only
- Auth endpoints are rate limited
- Mutating authenticated routes expect a CSRF header
- Passwords use bcrypt; session tokens are hashed before storage
- Do not log passwords, `DATABASE_URL`, tokens, or private keys
- Authorization is enforced in the API, not in the browser
