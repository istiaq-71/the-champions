import { Hero } from '@/components/home/Hero'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { AchievementsSection } from '@/components/home/AchievementsSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { BranchesSection } from '@/components/home/BranchesSection'
import { OnlineLearningSection } from '@/components/home/OnlineLearningSection'
import { Testimonials } from '@/components/home/Testimonials'
import { CTA } from '@/components/home/CTA'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProgramsSection />
      <AchievementsSection />
      <ServicesSection />
      <BranchesSection />
      <OnlineLearningSection />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}

