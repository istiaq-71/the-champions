# 🍃 MongoDB Setup Guide

Since you're familiar with MongoDB, here's how to set up your database!

## Option 1: MongoDB Atlas (Recommended - Free Cloud)

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up** (free, no credit card needed)
3. **Create a free cluster:**
   - Choose "Free" (M0) tier
   - Choose a cloud provider and region closest to you
   - Click "Create Cluster"
4. **Create database user:**
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (remember these!)
   - Give user "Read and write to any database" permission
5. **Whitelist your IP:**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) OR add your IP
6. **Get connection string:**
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user password
   - Add database name at the end: `...mongodb.net/thechampions?retryWrites=true&w=majority`

7. **Update `.env` file:**
   - Open `.env` in the project folder
   - Replace `DATABASE_URL` with your MongoDB Atlas connection string

**Example:**
```
DATABASE_URL="mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/thechampions?retryWrites=true&w=majority"
```

---

## Option 2: Local MongoDB

If you have MongoDB installed locally:

1. **Make sure MongoDB is running:**
   ```powershell
   # Check if MongoDB service is running
   # Or start it manually if needed
   ```

2. **Update `.env` file:**
   ```
   DATABASE_URL="mongodb://localhost:27017/thechampions"
   ```

---

## After Setting Up Database

Once you have the `DATABASE_URL` in your `.env` file, run:

```powershell
# Generate Prisma Client for MongoDB
npm run db:generate

# Push schema to database (creates collections)
npm run db:push

# Seed database with initial data
npm run db:seed

# Start the development server
npm run dev
```

---

## MongoDB Atlas Tips

- **Free tier includes:** 512MB storage (plenty for development!)
- **No credit card required** for free tier
- **Auto-scaling:** Atlas handles everything for you
- **Backup included:** Automatic backups on free tier

---

## What's Different with MongoDB?

✅ **What works the same:**
- All Prisma queries work identically
- Same code, same API
- Enums, relations, indexes all work

🔄 **What's different:**
- Uses `@db.ObjectId` for IDs (automatic with Prisma)
- Collections instead of tables (Prisma handles this)
- No migrations needed (just `db:push`)
- JSON fields work natively

---

## Need Help?

If you get stuck:
1. Check your connection string format
2. Verify your MongoDB user password
3. Make sure IP is whitelisted (Atlas)
4. Check MongoDB service is running (local)

Happy coding! 🚀

