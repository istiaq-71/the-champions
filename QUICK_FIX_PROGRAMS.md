# Quick Fix: Programs Not Loading

## Issue
API is returning 500 error, so programs are not loading. This is likely because:
1. Database schema hasn't been migrated yet (new fields: courseClass, priceType, features, order)
2. Database connection issue
3. No programs in database

## Quick Fix Steps

### Option 1: Run Database Migration (Recommended)
```bash
npm run db:push
npm run db:seed
```

### Option 2: If Database Connection Fails
Check your `.env` file has the correct MongoDB connection string:
```
DATABASE_URL="mongodb+srv://istiaqhossain71_db_user:SaGLDOvP11xrH3Tj@champions.csq98xc.mongodb.net/?appName=champions"
```

### Option 3: Temporary Mock Data
If you want to see the UI working immediately, you can temporarily add mock data to the component while you fix the database.

## Current Status
- ✅ UI is working correctly
- ✅ Filters are displaying
- ❌ Programs API returning 500 error
- ⚠️ Need to run database migration

## After Fixing
Once database is migrated and seeded, programs should load automatically!

