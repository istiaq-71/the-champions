// Utility functions for Firebase Storage operations
import { adminStorage } from './firebase-admin'

// Note: These functions require Firebase Admin to be configured

export async function uploadFile(
  file: Buffer,
  path: string,
  contentType: string = 'image/jpeg'
): Promise<string> {
  if (!adminStorage) {
    throw new Error('Firebase Storage is not configured')
  }
  
  const bucket = adminStorage.bucket()
  const fileRef = bucket.file(path)

  await fileRef.save(file, {
    metadata: {
      contentType,
    },
    resumable: false,
  })

  // Make the file publicly accessible
  await fileRef.makePublic()

  // Get the public URL
  const [url] = await fileRef.getSignedUrl({
    action: 'read',
    expires: '03-09-2491', // Far future date (effectively permanent)
  })

  return url
}

export async function deleteFile(path: string): Promise<void> {
  if (!adminStorage) {
    throw new Error('Firebase Storage is not configured')
  }
  
  const bucket = adminStorage.bucket()
  const fileRef = bucket.file(path)
  await fileRef.delete()
}

export async function getFileUrl(path: string): Promise<string> {
  if (!adminStorage) {
    throw new Error('Firebase Storage is not configured')
  }
  
  const bucket = adminStorage.bucket()
  const fileRef = bucket.file(path)
  const [url] = await fileRef.getSignedUrl({
    action: 'read',
    expires: '03-09-2491',
  })
  return url
}

