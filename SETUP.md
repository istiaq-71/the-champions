# Setup Guide - The Champions Education Platform

## Quick Start

Follow these steps to get the platform running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/thechampions?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed database with initial data (admin user, sample courses)
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Default Accounts

After running the seed script:

- **Admin**: `admin@thechampions.edu` / `admin123`
- **Teacher**: `teacher@thechampions.edu` / `teacher123`

⚠️ **Important**: Change these passwords in production!

## Project Structure Overview

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (REST)
│   ├── admin/             # Admin dashboard
│   ├── student/           # Student dashboard
│   ├── teacher/           # Teacher dashboard
│   ├── auth/              # Authentication pages
│   └── (public pages)     # Home, Courses, About, Contact
├── components/            # React components
│   ├── layout/           # Navbar, Footer
│   ├── home/             # Homepage sections
│   ├── student/          # Student components
│   ├── teacher/          # Teacher components
│   └── admin/            # Admin components
├── lib/                   # Utilities & configurations
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # NextAuth config
│   ├── utils.ts          # Helper functions
│   └── i18n.ts           # Translations
└── prisma/               # Database schema
    ├── schema.prisma     # Database models
    └── seed.ts           # Seed script
```

## Key Features Implemented

### ✅ Completed

1. **Authentication System**
   - Sign up/Sign in
   - Role-based access (Student, Teacher, Admin)
   - Secure JWT sessions

2. **Database Models**
   - Users, Courses, Enrollments
   - Payments, Assignments, Messages
   - Blog, Notices, Notifications

3. **User Dashboards**
   - Student dashboard with stats
   - Teacher dashboard with course management
   - Admin dashboard with analytics

4. **Homepage**
   - Hero section with slider
   - Features showcase
   - Course highlights
   - Teacher showcase
   - Testimonials

5. **Course Management**
   - Browse courses
   - Course detail pages
   - Enrollment system

6. **Payment System Structure**
   - Payment creation API
   - Payment verification API
   - Support for bKash, Rocket, Card (ready for integration)

7. **API Routes**
   - Authentication
   - Courses (list, detail)
   - Enrollments
   - Payments
   - Dashboard data

### 🔄 Next Steps (To Complete)

1. **Payment Gateway Integration**
   - Integrate bKash API
   - Integrate Rocket API
   - Integrate Stripe for card payments
   - Payment webhook handlers

2. **Course Management (Teacher)**
   - Create/edit courses UI
   - Upload course content (videos, PDFs)
   - Manage course content order

3. **Student Features**
   - View enrolled courses
   - Access course content
   - Submit assignments
   - Track progress

4. **Admin Features**
   - User management UI
   - Course approval/moderation
   - Payment management
   - Blog/Notice management
   - Analytics dashboard

5. **Content Management**
   - File upload system (AWS S3 or similar)
   - Video streaming integration
   - PDF viewer

6. **Messaging System**
   - Student-Teacher messaging
   - Admin messaging
   - Notifications

7. **Internationalization**
   - Complete Bangla translations
   - Language switcher UI
   - SEO optimization for both languages

## Database Commands

```bash
# Generate Prisma Client (run after schema changes)
npm run db:generate

# Push schema changes to database
npm run db:push

# Create a migration (recommended for production)
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

## Development Tips

1. **Hot Reload**: Next.js has hot reload enabled by default
2. **Database Changes**: After modifying `schema.prisma`, run `npm run db:generate` and `npm run db:push`
3. **Type Safety**: TypeScript is configured in strict mode
4. **Linting**: Run `npm run lint` to check for issues

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Connect database
5. Deploy

### Database Options

- **Vercel Postgres**: Easy integration with Vercel
- **Supabase**: Free tier available
- **Neon**: Serverless Postgres
- **Railway**: Simple setup
- **AWS RDS**: Enterprise solution

Update `DATABASE_URL` in production environment variables.

## Troubleshooting

### Database Connection Issues

- Check `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Verify network access

### Authentication Issues

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies

### Build Errors

- Run `npm run db:generate` before building
- Check TypeScript errors: `npm run lint`
- Ensure all environment variables are set

## Support

For issues or questions:
1. Check the README.md
2. Review Prisma documentation
3. Check Next.js documentation
4. Review NextAuth.js documentation

---

Happy coding! 🚀

