import { Navbar } from '@/components/layout/Navbar'
import { TeacherSidebar } from '@/components/teacher/TeacherSidebar'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="flex">
        <TeacherSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

