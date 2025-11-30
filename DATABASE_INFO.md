# 📊 Render PostgreSQL Database Information

Your database is already created and ready to use!

## Database Details

- **Service ID:** `dpg-d4lhff0gjchc73anqadg-a`
- **Database Name:** `support-haven-db`
- **Host:** `dpg-d4lhff0gjchc73anqadg-a.oregon-postgres.render.com`
- **Port:** `5432`
- **Database:** `support_haven_db`
- **Username:** `support_haven_db_user`
- **Password:** `YOUR_DATABASE_PASSWORD` ⚠️ **Get this from Render dashboard, never commit real passwords!**

## Connection Strings

### Internal URL (for Render services):
```
postgresql://support_haven_db_user:YOUR_DATABASE_PASSWORD@dpg-d4lhff0gjchc73anqadg-a/support_haven_db
```

### External URL (for external connections):
```
postgresql://support_haven_db_user:YOUR_DATABASE_PASSWORD@dpg-d4lhff0gjchc73anqadg-a.oregon-postgres.render.com/support_haven_db
```

## PSQL Command

To connect via command line:
```bash
PGPASSWORD=YOUR_DATABASE_PASSWORD psql -h dpg-d4lhff0gjchc73anqadg-a.oregon-postgres.render.com -U support_haven_db_user support_haven_db
```

## Environment Variables for Render Backend

When deploying backend to Render, use these values:

```
DB_HOST=dpg-d4lhff0gjchc73anqadg-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=support_haven_db
DB_USER=support_haven_db_user
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

## Security Note

⚠️ **Keep these credentials secure!** They're stored in:
- Render dashboard (for backend deployment)
- `.env` file (local development, not in git)

Never commit credentials to GitHub!

