# 🔧 Troubleshooting Guide

## Current Issue: "Doesn't work"

To help diagnose the issue, please check the following:

### 1. **Browser Console Errors**
Open your browser's Developer Tools (F12) and check the Console tab. Share any red error messages you see.

### 2. **Network Tab**
In Developer Tools, go to the Network tab and refresh the page. Check if any requests are failing (red status codes).

### 3. **What exactly doesn't work?**
- Does the page not load at all?
- Does it show a blank page?
- Do you see error messages?
- Does it load but look broken?

---

## Common Issues & Solutions

### Issue: "useSession must be wrapped in SessionProvider"
**Status:** ✅ Should be fixed (we just fixed this)
**Solution:** Hard refresh the page (Ctrl+Shift+R)

### Issue: 500 Internal Server Error
**Possible causes:**
1. Database connection issue
2. Missing environment variables
3. Server-side code error

**Check:**
- Is MongoDB Atlas connection string correct in `.env`?
- Are NEXTAUTH_SECRET and NEXTAUTH_URL set?

### Issue: Page loads but is blank
**Possible causes:**
1. JavaScript errors blocking render
2. CSS not loading
3. React hydration mismatch

**Solution:** Check browser console for errors

### Issue: "Module not found" errors
**Solution:** Run `npm install` again

---

## Quick Diagnostic Steps

1. **Check server is running:**
   ```powershell
   # Should see Next.js output in terminal
   npm run dev
   ```

2. **Check .env file exists:**
   ```powershell
   Get-Content .env
   ```

3. **Verify database connection:**
   ```powershell
   npm run db:push
   ```

4. **Clear Next.js cache:**
   ```powershell
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

---

## Need More Help?

Please share:
1. **Browser console errors** (copy/paste the red error messages)
2. **What you see** when you visit http://localhost:3000
3. **Any error messages** in the terminal where `npm run dev` is running

This will help me identify the exact issue!


