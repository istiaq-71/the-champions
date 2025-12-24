# Firebase Setup Guide

## Overview
This project uses Firebase for:
- **Firebase Storage**: Storing images, files, and media content
- **Future**: Firebase Authentication, Cloud Functions, Real-time features

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Follow the setup wizard
4. Enable **Firebase Storage** in the project

### 2. Generate Service Account Key (for Server-side)

1. Go to **Project Settings** → **Service Accounts**
2. Click **Generate new private key**
3. Download the JSON file
4. **IMPORTANT**: Keep this file secure and never commit it to Git

### 3. Get Firebase Web App Config (for Client-side)

1. Go to **Project Settings** → **General**
2. Scroll to "Your apps" section
3. Click the **Web icon** (`</>`) to add a web app
4. Register the app and copy the config object

### 4. Configure Environment Variables

Create/update your `.env.local` file with the following:

```env
# Firebase Admin SDK (from Service Account JSON)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# Firebase Client SDK (from Web App Config)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 5. Configure Firebase Storage Rules

Go to **Storage** → **Rules** and set:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow read access to all files
      allow read: if true;
      
      // Only allow authenticated users to write
      allow write: if request.auth != null;
      
      // Or for public writes (less secure, use only for testing)
      // allow write: if true;
    }
  }
}
```

### 6. Storage Structure

Recommended folder structure:
```
uploads/
  ├── courses/
  │   ├── thumbnails/
  │   └── content/
  ├── users/
  │   └── avatars/
  └── assignments/
```

## Usage

### Server-side (API Routes)

```typescript
import { uploadFile } from '@/lib/firebase-storage'

// Upload a file
const fileBuffer = await file.arrayBuffer()
const url = await uploadFile(
  Buffer.from(fileBuffer),
  `courses/thumbnails/${courseId}.jpg`,
  'image/jpeg'
)
```

### Client-side (React Components)

```typescript
import { storage } from '@/lib/firebase-client'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Upload file
const storageRef = ref(storage, `courses/thumbnails/${filename}`)
await uploadBytes(storageRef, file)
const url = await getDownloadURL(storageRef)
```

## Security Notes

1. **Never commit** service account keys or private keys to Git
2. Use environment variables for all sensitive data
3. Implement proper Storage rules based on your security requirements
4. Consider using Firebase App Check for additional security

## Troubleshooting

### Error: "Firebase App named '[DEFAULT]' already exists"
- This means Firebase is initialized multiple times
- The code already handles this with `getApps().length` check

### Error: "Permission denied"
- Check your Storage rules
- Verify authentication if using authenticated rules

### Error: "Invalid API key"
- Verify your environment variables are correct
- Make sure `NEXT_PUBLIC_` prefix is used for client-side variables

