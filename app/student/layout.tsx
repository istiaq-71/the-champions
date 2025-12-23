import { Navbar } from '@/components/layout/Navbar'
import { StudentSidebar } from '@/components/student/StudentSidebar'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="flex">
        <StudentSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

