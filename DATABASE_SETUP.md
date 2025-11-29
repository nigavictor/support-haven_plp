# Database Setup Guide

## Quick Setup

### Option 1: Using postgres user (if you have sudo access)

```bash
# Create database
sudo -u postgres createdb support_haven

# Update backend/.env
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

### Option 2: Using your current user

```bash
# First, create a PostgreSQL user for yourself (if needed)
sudo -u postgres createuser -s hduser

# Create database
createdb support_haven

# Update backend/.env (password may be empty for peer auth)
DB_USER=hduser
DB_PASSWORD=
```

### Option 3: Manual PostgreSQL Setup

1. Open PostgreSQL command line:
   ```bash
   psql -U postgres
   ```

2. Create database:
   ```sql
   CREATE DATABASE support_haven;
   ```

3. Create user (if needed):
   ```sql
   CREATE USER your_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE support_haven TO your_user;
   ```

4. Update `backend/.env`:
   ```env
   DB_USER=your_user
   DB_PASSWORD=your_password
   ```

## Verify Setup

Test your database connection:

```bash
psql -U your_user -d support_haven -c "SELECT version();"
```

If this works, your database is ready!

## Troubleshooting

### "password authentication failed"
- Check your credentials in `backend/.env`
- Verify the user exists: `psql -U postgres -c "\du"`
- Try using `postgres` user with proper password

### "database does not exist"
- Create it: `createdb support_haven` or use psql to create it
- Check the database name in `backend/.env` matches

### "permission denied"
- You may need to use the `postgres` superuser
- Or ask your system admin to grant you database creation privileges

## After Database Setup

Once the database is created and configured:

1. Start the backend - it will automatically create all tables:
   ```bash
   cd backend && npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend && npm run dev
   ```

The server will automatically initialize all required tables on first run!

