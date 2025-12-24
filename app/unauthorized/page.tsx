import Link from 'next/link'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Unauthorized</h1>
          <p className="text-neutral-600">
            You don&#39;t have permission to access this page.
          </p>
        </div>
        
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Go Back Home</span>
        </Link>
      </div>
    </div>
  )
}

