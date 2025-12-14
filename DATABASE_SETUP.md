# Database Setup Guide

## Option 1: Install PostgreSQL (Recommended)

### macOS (using Homebrew)
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Create Database
```bash
createdb sweet_shop_db
```

### Update .env file
Edit `backend/.env` and update the DATABASE_URL if needed:
```
DATABASE_URL=postgresql://localhost:5432/sweet_shop_db
```

If you have a username/password:
```
DATABASE_URL=postgresql://username:password@localhost:5432/sweet_shop_db
```

### Run Migrations
```bash
cd backend
npm run migrate
```

## Option 2: Use Docker PostgreSQL

If you have Docker installed:
```bash
docker run --name sweet-shop-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sweet_shop_db \
  -p 5432:5432 \
  -d postgres:14

# Update .env file
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sweet_shop_db
```

Then run migrations:
```bash
cd backend
npm run migrate
```

## Verify Database Connection

After setting up PostgreSQL, test the connection:
```bash
psql sweet_shop_db
```

If successful, you should see the PostgreSQL prompt. Type `\q` to exit.

