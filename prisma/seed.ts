import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@thechampions.edu' },
    update: {},
    create: {
      email: 'admin@thechampions.edu',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Admin user created:', adminUser.email)

  // Create sample teacher
  const teacherPassword = await bcrypt.hash('teacher123', 12)
  
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@thechampions.edu' },
    update: {},
    create: {
      email: 'teacher@thechampions.edu',
      password: teacherPassword,
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

  console.log('✅ Teacher user created:', teacherUser.email)

  // Create sample courses if teacher profile exists
  if (teacherUser.teacherProfile) {
    const course1 = await prisma.course.upsert({
      where: { slug: 'hsc-preparation-course' },
      update: {},
      create: {
        title: 'HSC Preparation Course',
        titleBn: 'এইচএসসি প্রস্তুতির কোর্স',
        slug: 'hsc-preparation-course',
        description: 'Complete HSC preparation with expert guidance and comprehensive study materials. Cover all subjects with detailed explanations and practice problems.',
        descriptionBn: 'বিশেষজ্ঞ নির্দেশনা এবং সম্পূর্ণ পাঠ্যসূচি সহ সম্পূর্ণ এইচএসসি প্রস্তুতি। বিস্তারিত ব্যাখ্যা এবং অনুশীলনের সমস্যা সহ সমস্ত বিষয় কভার করুন।',
        price: 5000,
        duration: 180,
        courseType: 'ONLINE',
        level: 'Intermediate',
        status: 'published',
        teacherId: teacherUser.teacherProfile.id,
      },
    })

    const course2 = await prisma.course.upsert({
      where: { slug: 'ssc-preparation-course' },
      update: {},
      create: {
        title: 'SSC Preparation Course',
        titleBn: 'এসএসসি প্রস্তুতির কোর্স',
        slug: 'ssc-preparation-course',
        description: 'Master SSC curriculum with structured lessons and practice materials. Build strong foundation in all subjects.',
        descriptionBn: 'স্ট্রাকচার্ড পাঠ এবং অনুশীলনের উপকরণ সহ এসএসসি পাঠ্যসূচি আয়ত্ত করুন। সমস্ত বিষয়ে শক্ত ভিত্তি গড়ে তুলুন।',
        price: 4000,
        duration: 150,
        courseType: 'HYBRID',
        level: 'Beginner',
        status: 'published',
        teacherId: teacherUser.teacherProfile.id,
      },
    })

    console.log('✅ Sample courses created')
  }

  console.log('✨ Seeding completed!')
  console.log('\n📝 Default credentials:')
  console.log('Admin: admin@thechampions.edu / admin123')
  console.log('Teacher: teacher@thechampions.edu / teacher123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

