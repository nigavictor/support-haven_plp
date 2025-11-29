# Support Haven Backend

Node.js/Express API server for Support Haven platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure database credentials in `.env`

4. Make sure PostgreSQL is running and database exists:
```bash
createdb support_haven
```

5. Start the server:
```bash
npm run dev  # Development mode with nodemon
# or
npm start    # Production mode
```

The server will automatically create database tables on first run.

## Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `DB_HOST`: PostgreSQL host
- `DB_PORT`: PostgreSQL port
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `ADMIN_USERNAME`: Admin login username
- `ADMIN_PASSWORD`: Admin login password

## API Documentation

See main README.md for API endpoint documentation.

