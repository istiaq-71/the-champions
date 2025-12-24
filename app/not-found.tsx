import Link from 'next/link'
import { FileQuestion, ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-700 mb-4">Page Not Found</h2>
          <p className="text-neutral-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Browse Courses</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

