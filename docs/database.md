# Takiia database

Takiia uses PostgreSQL through Prisma. Production and development are separate.

## Production

- Host: `127.0.0.1`
- Port: `5432`
- Database: `takiia_db`
- Role: `takiia_app`
- Connection string lives only in `/srv/apps/takiia/apps/api/.env` on the VPS
- PostgreSQL is not exposed on a public interface

Never copy the production `DATABASE_URL` into this repository, GitHub variables, or a laptop `.env`.

## Local development

Create a dedicated database, for example:

```sql
CREATE ROLE takiia_dev LOGIN PASSWORD 'choose-a-local-password';
CREATE DATABASE takiia_dev OWNER takiia_dev;
```

Copy `apps/api/.env.example` to `apps/api/.env` and point `DATABASE_URL` at `takiia_dev`.

Commands:

```bash
# local only
npm run prisma:migrate:dev -w @takiia/api

# production only, after backup and approval
npx prisma migrate deploy
```

Rules:

- `prisma migrate dev` is local development only
- `prisma migrate deploy` is production only after a verified `takiia_db` backup
- Never run `prisma db push` against production
- Never connect this app to another website's database
