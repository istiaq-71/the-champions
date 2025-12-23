# 🚀 Step-by-Step Setup Guide - The Champions Platform

Welcome! This guide will walk you through setting up the platform step by step. Follow each step carefully.

---

## 📋 STEP 1: Install Node.js (if not already installed)

1. **Check if Node.js is installed:**
   - Open PowerShell or Command Prompt
   - Type: `node --version`
   - If you see a version number (like v18.x.x or v20.x.x), you're good!
   - If you see an error, continue to step 2

2. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Download the **LTS version** (recommended)
   - Install it (accept all defaults)
   - Restart your computer after installation

3. **Verify installation:**
   - Open a NEW PowerShell window
   - Type: `node --version` (should show version)
   - Type: `npm --version` (should show version)

---

## 📋 STEP 2: Install PostgreSQL Database (if not already installed)

### Option A: Install PostgreSQL Locally (Recommended for beginners)

1. **Download PostgreSQL:**
   - Go to: https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Download the Windows x86-64 version

2. **Install PostgreSQL:**
   - Run the installer
   - **Important:** Remember the password you set for the `postgres` user (you'll need this!)
   - Accept all defaults (port 5432 is fine)
   - Complete the installation

3. **Verify installation:**
   - Open "SQL Shell (psql)" from Start Menu
   - Press Enter 4 times (to accept defaults)
   - Enter the password you set during installation
   - You should see: `postgres=#`
   - Type: `\q` and press Enter to quit

### Option B: Use a Cloud Database (Easier, but requires account)

**Recommended services (all have free tiers):**
- **Supabase** (https://supabase.com) - Easiest option
- **Neon** (https://neon.tech) - Serverless Postgres
- **Railway** (https://railway.app) - Simple setup

**For Supabase:**
1. Go to https://supabase.com and sign up (free)
2. Create a new project
3. Go to Settings > Database
4. Copy the "Connection string" (URI)
5. You'll use this in STEP 4

---

## 📋 STEP 3: Install Project Dependencies

1. **Open PowerShell in the project folder:**
   - Navigate to: `C:\projects\The Champions`
   - Right-click in the folder → "Open in Terminal" or "Open PowerShell window here"

2. **Install dependencies:**
   ```powershell
   npm install
   ```
   - This will take 2-5 minutes (be patient!)
   - Wait until you see "added XXX packages"

---

## 📋 STEP 4: Set Up Environment Variables

1. **Create `.env` file:**
   - In the project folder, create a new file named `.env` (not `.env.txt`)
   - Make sure there's no file extension!

2. **Open `.env` file in a text editor and add:**

   ```env
   # Database URL
   # Option 1: If using local PostgreSQL
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/thechampions?schema=public"
   
   # Option 2: If using Supabase (replace with your connection string)
   # DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
   
   # NextAuth Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"
   ```

3. **Update the DATABASE_URL:**
   - Replace `YOUR_PASSWORD` with the password you set for PostgreSQL
   - Or use your Supabase connection string

4. **Generate NEXTAUTH_SECRET:**
   - Open PowerShell
   - Run: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
   - Copy the output and replace `your-secret-key-here-change-this-in-production`

---

## 📋 STEP 5: Create the Database

1. **If using local PostgreSQL:**
   - Open "SQL Shell (psql)" from Start Menu
   - Press Enter 4 times, then enter your password
   - Type: `CREATE DATABASE thechampions;`
   - Press Enter
   - Type: `\q` and press Enter to quit

2. **If using Supabase:**
   - Database is already created, skip this step

---

## 📋 STEP 6: Set Up Database Tables

Run these commands in PowerShell (in the project folder):

```powershell
# Generate Prisma Client
npm run db:generate

# Push database schema (creates all tables)
npm run db:push

# Seed database with initial data (creates admin user)
npm run db:seed
```

**What this does:**
- `db:generate` - Creates the database client code
- `db:push` - Creates all database tables
- `db:seed` - Adds initial data (admin account, sample courses)

---

## 📋 STEP 7: Start the Development Server

Run this command:

```powershell
npm run dev
```

**What you should see:**
- "Ready in X seconds"
- "Local: http://localhost:3000"

---

## 📋 STEP 8: Open the Application

1. **Open your web browser**
2. **Go to:** http://localhost:3000
3. **You should see:** The Champions homepage!

---

## 📋 STEP 9: Test the Application

### Login with Default Accounts:

**Admin Account:**
- Email: `admin@thechampions.edu`
- Password: `admin123`

**Teacher Account:**
- Email: `teacher@thechampions.edu`
- Password: `teacher123`

**Steps:**
1. Click "Sign In" in the top right
2. Enter one of the emails above
3. Enter the corresponding password
4. Click "Sign In"
5. You should be redirected to your dashboard!

---

## ✅ You're All Set!

The application should now be running. Here's what you can do:

1. **Browse the homepage** - See all the features
2. **View courses** - Click "Courses" in the menu
3. **Sign up as a student** - Create a new account
4. **Explore dashboards** - Log in as admin/teacher to see their views

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Node.js is not installed. Go back to STEP 1.

### Problem: "Error: connect ECONNREFUSED"
**Solution:** PostgreSQL is not running. Start PostgreSQL service:
- Open "Services" (search in Start Menu)
- Find "postgresql-x64-XX"
- Right-click → Start

### Problem: "Invalid DATABASE_URL"
**Solution:** Check your `.env` file:
- Make sure there are no spaces around the `=`
- Make sure the password is correct
- Make sure the database name matches (thechampions)

### Problem: "Module not found"
**Solution:** Dependencies not installed. Run `npm install` again.

### Problem: Port 3000 already in use
**Solution:** Another app is using port 3000. Either:
- Close the other app, OR
- Change the port in `package.json` scripts: `"dev": "next dev -p 3001"`

---

## 📚 Next Steps

Once everything is working:

1. **Change default passwords** (especially for admin account!)
2. **Add your logo** to `public/images/logo.png`
3. **Customize colors** in `tailwind.config.ts`
4. **Add real courses** through the admin panel
5. **Set up payment gateways** (bKash, Rocket, Stripe)

---

## 💡 Need Help?

If you get stuck at any step, let me know which step you're on and what error message you're seeing!

---

**Happy coding! 🎉**

