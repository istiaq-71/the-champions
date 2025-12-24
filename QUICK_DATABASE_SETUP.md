# 🚀 Quick Database Setup (2 minutes)

Since PostgreSQL isn't installed locally, let's use a **free cloud database** - it's easier and faster!

## Option 1: Neon (Recommended - Easiest)

1. **Go to:** https://neon.tech
2. **Click "Sign up"** (free, no credit card needed)
3. **Create a new project:**
   - Project name: `the-champions`
   - Region: Choose closest to you
   - Click "Create project"
4. **Copy the connection string:**
   - You'll see a connection string like: `postgresql://user:pass@ep-xxx.region.neon.tech/neondb?sslmode=require`
   - Click "Copy" button
5. **Update your `.env` file:**
   - Open `.env` file in the project folder
   - Replace the `DATABASE_URL` line with:
     ```
     DATABASE_URL="paste-your-connection-string-here"
     ```
   - Make sure to keep the quotes!

**Done!** That's it! ✅

---

## Option 2: Supabase (Alternative)

1. **Go to:** https://supabase.com
2. **Sign up** (free)
3. **Create a new project**
4. **Go to:** Settings → Database
5. **Copy the "Connection string"** (URI format)
6. **Update `.env` file** with the connection string

---

## Option 3: Install PostgreSQL Locally (if you prefer)

1. Download from: https://www.postgresql.org/download/windows/
2. Install (remember the password you set!)
3. Create database: Open "SQL Shell" and run: `CREATE DATABASE thechampions;`
4. Update `.env` with: `DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/thechampions?schema=public"`

---

## After Setting Up Database

Once you have the `DATABASE_URL` in your `.env` file, come back and I'll continue with the setup!

