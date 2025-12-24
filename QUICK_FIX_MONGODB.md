# ⚡ Quick Fix: MongoDB Connection

## 🎯 Most Likely Solution

Your MongoDB Atlas is blocking your IP address. Fix it in 2 minutes:

### Step 1: Go to MongoDB Atlas
1. Visit: https://cloud.mongodb.com/
2. Login
3. Select your project

### Step 2: Allow Network Access
1. Click **"Network Access"** (left sidebar, under Security)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** button (for development)
4. Click **"Confirm"**

### Step 3: Wait 1-2 Minutes
MongoDB needs time to update network rules.

### Step 4: Try Again
```bash
npm run db:seed:demo
```

---

## ✅ That's It!

99% of connection issues are solved by adding IP to Network Access.

---

## 🆘 Still Not Working?

See detailed guide: `MONGODB_CONNECTION_FIX.md`

