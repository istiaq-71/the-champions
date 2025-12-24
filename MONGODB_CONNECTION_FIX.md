# MongoDB Connection Fix Guide

## Current Issue
MongoDB Atlas connection is timing out with error:
```
Server selection timeout: No available servers
I/O error: received fatal alert: InternalError
```

## Quick Fixes

### Option 1: Check MongoDB Atlas Network Access (Most Common)

1. **Go to MongoDB Atlas Dashboard**
   - Visit: https://cloud.mongodb.com/
   - Login to your account

2. **Navigate to Network Access**
   - Click on your project
   - Go to **Security** → **Network Access** (left sidebar)

3. **Add IP Address**
   - Click **"Add IP Address"** button
   - Choose one of:
     - **"Allow Access from Anywhere"** (for development) - Click this button
     - Or add your current IP address manually
   - Click **"Confirm"**

4. **Wait 1-2 minutes** for changes to propagate

5. **Test Connection**
   ```bash
   npm run db:seed:demo
   ```

### Option 2: Verify Connection String

Check your `.env` file has the correct connection string:
```env
DATABASE_URL="mongodb+srv://istiaqhossain71_db_user:SaGLDOvP11xrH3Tj@champions.csq98xc.mongodb.net/?appName=champions"
```

**Important Notes:**
- Make sure there are no extra spaces
- Password should be URL-encoded if it contains special characters
- Database name should be included in the URL

### Option 3: Check MongoDB Atlas Status

1. Go to MongoDB Atlas Dashboard
2. Check if your cluster is running (not paused)
3. If paused, click "Resume" and wait for it to start

### Option 4: Try Alternative Connection String Format

If the above doesn't work, try adding database name explicitly:
```env
DATABASE_URL="mongodb+srv://istiaqhossain71_db_user:SaGLDOvP11xrH3Tj@champions.csq98xc.mongodb.net/thechampions?retryWrites=true&w=majority&appName=champions"
```

### Option 5: Test with MongoDB Compass (Recommended)

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect using your connection string
3. If Compass connects, the issue is with Prisma configuration
4. If Compass doesn't connect, the issue is with MongoDB Atlas settings

### Option 6: Firewall/VPN Issues

If you're behind a corporate firewall or VPN:
- Try disconnecting VPN
- Check if your network blocks MongoDB ports
- Try from a different network (mobile hotspot)

## After Fixing Connection

Once connection is fixed, run:

```bash
# First, ensure basic seed is done (creates admin and teacher)
npm run db:seed

# Then add demo programs
npm run db:seed:demo
```

## Alternative: Use Local MongoDB (For Development)

If Atlas continues to have issues, you can use local MongoDB:

1. **Install MongoDB locally** (if not already installed)
   - Windows: Download from https://www.mongodb.com/try/download/community
   - Or use Docker: `docker run -d -p 27017:27017 mongo`

2. **Update .env**
   ```env
   DATABASE_URL="mongodb://localhost:27017/thechampions"
   ```

3. **Run migrations**
   ```bash
   npm run db:push
   npm run db:seed
   npm run db:seed:demo
   ```

## Troubleshooting Steps

1. ✅ Check Network Access in MongoDB Atlas
2. ✅ Verify connection string in `.env`
3. ✅ Check cluster status (not paused)
4. ✅ Test with MongoDB Compass
5. ✅ Try from different network
6. ✅ Check firewall/VPN settings

## Common Solutions Summary

| Issue | Solution |
|-------|----------|
| Connection timeout | Add IP to Network Access |
| Authentication failed | Check username/password in connection string |
| Cluster paused | Resume cluster in Atlas |
| Network blocked | Disable VPN or use different network |
| Invalid connection string | Verify format in .env |

## Still Having Issues?

If none of the above works:
1. Check MongoDB Atlas status page: https://status.mongodb.com/
2. Contact MongoDB Atlas support
3. Consider using local MongoDB for development
4. Verify your Atlas account isn't suspended

---

**Most Common Fix:** Adding your IP address to MongoDB Atlas Network Access (Option 1) solves 90% of connection issues!

