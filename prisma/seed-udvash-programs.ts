// Demo programs matching Udvash style
// Run with: npx tsx prisma/seed-udvash-programs.ts

import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const demoPrograms = [
  {
    title: 'Parallel Text (Class 6-12)',
    titleBn: 'প্যারালাল Text (ষষ্ঠ-দ্বাদশ)',
    slug: 'parallel-text-class-6-12',
    description: 'Comprehensive text-based learning for classes 6-12 with concept-based discussions.',
    descriptionBn: 'দৃঢ় বেসিক গঠনে কনসেপ্ট ভিত্তিক আলোচনা, বাস্তব উদাহরণ, গল্প এবং চিত্রালোকে সাজানো',
    price: 3000,
    priceType: 'PAID' as const,
    courseType: 'HYBRID' as const,
    courseClass: 'SIX' as const,
    features: [
      'দৃঢ় বেসিক গঠনে কনসেপ্ট ভিত্তিক আলোচনা',
      'বাস্তব উদাহরণ, গল্প এবং চিত্রালোকে সাজানো',
      'সংজ্ঞা, বৈশিষ্ট্য, পার্থক্য ইত্যাদি নির্দেশকের মাধ্যমে পৃথককরণ',
      'বোর্ড ও এডমিশন প্রশ্ন-সমাধান ব্যাখ্যাসহকারে বিশ্লেষণ',
      'প্র্যাকটিস ও গাণিতিক সমস্যাবলি সংযোজন',
    ],
    duration: 180,
    level: 'Intermediate',
    status: 'published',
    order: 0,
  },
  {
    title: 'Engineering Model Test Package 2025',
    titleBn: 'ইঞ্জিনিয়ারিং মডেল টেস্ট প্যাকেজ- 2025',
    slug: 'engineering-model-test-package-2025',
    description: 'Complete model test preparation package for engineering admission tests.',
    descriptionBn: 'পেপার ফাইনাল, সাবজেক্ট ফাইনাল, কম্বাইন্ড পেপার ফাইনাল, ফাইনাল মডেল টেস্ট, স্পেশাল মডেল টেস্ট, সল্যুশন বুক',
    price: 5000,
    priceType: 'PAID' as const,
    courseType: 'ONLINE' as const,
    courseClass: 'MODEL_TEST' as const,
    features: [
      'পেপার ফাইনাল, সাবজেক্ট ফাইনাল',
      'কম্বাইন্ড পেপার ফাইনাল',
      'ফাইনাল মডেল টেস্ট',
      'স্পেশাল মডেল টেস্ট',
      'সল্যুশন বুক',
      'কোর্স শুরু: ২৯ নভেম্বর, ২০২৫',
    ],
    duration: 120,
    level: 'Advanced',
    status: 'published',
    order: 61,
  },
  {
    title: 'DU Unit A Model Test Package 2025',
    titleBn: 'ভার্সিটি ক মডেল টেস্ট প্যাকেজ ২০২৫',
    slug: 'du-unit-a-model-test-package-2025',
    description: 'Comprehensive model test package for DU Unit A admission test.',
    descriptionBn: 'পেপার ফাইনাল, সাবজেক্ট ফাইনাল, ফাইনাল মডেল টেস্ট, স্পেশাল মডেল টেস্ট, সল্যুশন বুক',
    price: 4500,
    priceType: 'PAID' as const,
    courseType: 'HYBRID' as const,
    courseClass: 'ADMISSION' as const,
    features: [
      'পেপার ফাইনাল',
      'সাবজেক্ট ফাইনাল',
      'ফাইনাল মডেল টেস্ট',
      'স্পেশাল মডেল টেস্ট',
      'সল্যুশন বুক',
      'কোর্স শুরু: ২১ নভেম্বর, ২০২৫',
    ],
    duration: 90,
    level: 'Advanced',
    status: 'published',
    order: 81,
  },
  {
    title: 'DU Unit B Model Test Package 2025',
    titleBn: 'ভার্সিটি খ মডেল টেস্ট প্যাকেজ- 2025',
    slug: 'du-unit-b-model-test-package-2025',
    description: 'Complete model test package for DU Unit B admission test.',
    descriptionBn: 'পেপার ফাইনাল, সাবজেক্ট ফাইনাল, ফাইনাল মডেল টেস্ট, স্পেশাল মডেল টেস্ট, সল্যুশন বুক, Final Touch',
    price: 4000,
    priceType: 'PAID' as const,
    courseType: 'HYBRID' as const,
    courseClass: 'ADMISSION' as const,
    features: [
      'পেপার ফাইনাল, সাবজেক্ট ফাইনাল',
      'ফাইনাল মডেল টেস্ট, স্পেশাল মডেল টেস্ট',
      'পেপার ফাইনাল সল্যুশন বুক',
      'সাবজেক্ট ফাইনাল সল্যুশন বুক',
      'ভার্সিটি খ Final Touch (সাজেশন বেইজড রিভিশন বুক)',
      'কোর্স শুরু: ১৯ নভেম্বর, ২০২৫',
    ],
    duration: 85,
    level: 'Advanced',
    status: 'published',
    order: 101,
  },
  {
    title: 'SSC 2026 Model Test Program',
    titleBn: 'SSC 2026 মডেল টেস্ট প্রোগ্রাম',
    slug: 'ssc-2026-model-test-program',
    description: 'Complete SSC 2026 model test preparation program.',
    descriptionBn: 'বিষয়ভিত্তিক প্রশ্নব্যাংক, অধ্যায়ভিত্তিক পরীক্ষা, প্রিন্টেড সল্ভ শিট, ফাইনাল সল্ভ ক্লাস',
    price: 3500,
    priceType: 'PAID' as const,
    courseType: 'ONLINE' as const,
    courseClass: 'TEN' as const,
    features: [
      'বিষয়ভিত্তিক প্রশ্নব্যাংক',
      'অধ্যায়ভিত্তিক পরীক্ষা',
      'প্রিন্টেড সল্ভ শিট',
      'ফাইনাল সল্ভ ক্লাস',
      'ফাইনাল মডেল টেস্ট',
      'সার্বক্ষণিক Q & A সেবা',
    ],
    duration: 150,
    level: 'Intermediate',
    status: 'published',
    order: 105,
  },
  {
    title: 'HSC 2026 Final Revision Course',
    titleBn: 'HSC 2026 ফাইনাল রিভিশন কোর্স',
    slug: 'hsc-2026-final-revision-course',
    description: 'Complete final revision course for HSC 2026 with concept-based learning.',
    descriptionBn: 'সকল বিষয়ের Concept + CQ + MCQ রিভিশন, ২১১টি স্মার্টবোর্ড লাইভ ক্লাস, ১৯১টি লাইভ MCQ এক্সাম',
    price: 6000,
    priceType: 'PAID' as const,
    courseType: 'ONLINE' as const,
    courseClass: 'TWELVE' as const,
    features: [
      'সকল বিষয়ের Concept + CQ + MCQ রিভিশন',
      '২১১টি স্মার্টবোর্ড লাইভ ক্লাস',
      '১৯১টি লাইভ MCQ এক্সাম',
      'MCQ & CQ PDF প্র্যাকটিস শীট',
      'ডাউট সলভিংয়ে সার্বক্ষণিক Q & A সার্ভিস',
      '২০২৫ ব্যাচের আর্কাইভ ক্লাসসমূহ',
      'শুরু: ১ ডিসেম্বর, ২০২৫',
    ],
    duration: 180,
    level: 'Advanced',
    status: 'published',
    order: 110,
  },
  {
    title: 'HSC 2026 Model Test',
    titleBn: 'HSC 2026 মডেল টেস্ট',
    slug: 'hsc-2026-model-test',
    description: 'Comprehensive model test program for HSC 2026.',
    descriptionBn: 'বিষয়ভিত্তিক CQ + MCQ প্রশ্নব্যাংক, অধ্যায়ভিত্তিক পরীক্ষা, ফাইনাল মডেল টেস্ট',
    price: 4000,
    priceType: 'PAID' as const,
    courseType: 'ONLINE' as const,
    courseClass: 'TWELVE' as const,
    features: [
      'বিষয়ভিত্তিক CQ + MCQ প্রশ্নব্যাংক: ১৩টি',
      'অধ্যায়ভিত্তিক পরীক্ষা: ৩৭টি',
      'ফাইনাল মডেল টেস্ট',
      'সার্বক্ষণিক Q & A সেবা',
    ],
    duration: 120,
    level: 'Advanced',
    status: 'published',
    order: 115,
  },
]

async function main() {
  console.log('🌱 Seeding Udvash-style demo programs...')

  // Try to find existing teacher first
  let teacherProfile = await prisma.teacherProfile.findFirst({
    include: {
      user: true,
    },
  })

  // If no teacher exists, try to create one
  if (!teacherProfile) {
    console.log('⚠️  No teacher found. Attempting to create one...')
    try {
      const hashedPassword = await bcrypt.hash('teacher123', 12)
      
      const teacherUser = await prisma.user.upsert({
        where: { email: 'teacher@thechampions.edu' },
        update: {},
        create: {
          email: 'teacher@thechampions.edu',
          password: hashedPassword,
          name: 'Sample Teacher',
          role: 'TEACHER',
          emailVerified: new Date(),
          teacherProfile: {
            create: {
              qualification: 'MSc in Mathematics',
              specialization: 'Mathematics & Physics',
              experience: 10,
              bio: 'Experienced educator with 10+ years of teaching experience.',
            },
          },
        },
        include: {
          teacherProfile: true,
        },
      })

      if (teacherUser.teacherProfile) {
        // Ensure we have the teacherProfile with the related user included
        teacherProfile = await prisma.teacherProfile.findUnique({
          where: { id: teacherUser.teacherProfile.id },
          include: { user: true },
        }) as typeof teacherProfile
      } else {
        console.error('❌ Failed to create teacher profile')
        return
      }
    } catch (error) {
      console.error('❌ Error creating teacher:', error)
      console.error('💡 Please ensure database connection is working and run: npm run db:seed')
      return
    }
  }

  if (!teacherProfile) {
    console.error('❌ No teacher profile found after creation')
    return
  }

  console.log('✅ Using teacher:', teacherProfile.user.name)

  // Create demo programs
  for (const program of demoPrograms) {
    const existing = await prisma.course.findUnique({
      where: { slug: program.slug },
    })

    if (!existing) {
      await prisma.course.create({
        data: {
          ...program,
          teacherId: teacherProfile.id,
        },
      })
      console.log(`✅ Created program: ${program.titleBn || program.title}`)
    } else {
      console.log(`⏭️  Skipped existing program: ${program.slug}`)
    }
  }

  console.log('✨ Demo programs seeding completed!')
  console.log(`📊 Total programs: ${demoPrograms.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding demo programs:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

