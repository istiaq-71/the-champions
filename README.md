# The Champions - Education Platform

A world-class, ultra-modern, scalable education web application for a coaching center named "The Champions".

## 🚀 Features

### Core Functionality
- **Multi-role System**: Student, Teacher, and Admin roles with role-based access control
- **Course Management**: Create, manage, and enroll in courses
- **Payment Integration**: Support for bKash, Rocket, and Card payments (structure ready)
- **Bilingual Support**: Full Bangla and English support
- **Online & Offline**: Support for both online and offline coaching

### User Features
- **Student Panel**: Dashboard, course enrollment, payments, assignments, messaging
- **Teacher Panel**: Course creation, content management, student tracking, analytics
- **Admin Panel**: Full system control, user management, analytics, CMS functionality

### Technical Features
- **Modern Stack**: Next.js 14 (App Router), React 18, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with secure JWT-based sessions
- **UI/UX**: Premium design with Tailwind CSS, Framer Motion animations
- **Performance**: Optimized with SSR, SSG, image optimization
- **Security**: HTTPS, encrypted passwords, input validation, role-based API protection

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "The Champions"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your app URL (e.g., `http://localhost:3000`)

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The application uses PostgreSQL with Prisma ORM. The schema includes:

- **User**: Authentication and user management
- **StudentProfile & TeacherProfile**: Role-specific profiles
- **Course**: Course information and metadata
- **CourseContent**: Videos, PDFs, assignments for each course
- **Enrollment**: Student-course relationships
- **Payment**: Payment records and history
- **Assignment & AssignmentSubmission**: Course assignments
- **Message**: Communication between users
- **Blog & Notice**: Content management
- **Notification**: User notifications

## 🔐 Authentication

The app uses NextAuth.js with credentials provider. Users can:
- Sign up as Student or Teacher
- Sign in with email and password
- Access role-based dashboards
- Protected API routes with middleware

## 💳 Payment Integration

The payment system structure is ready for:
- **bKash**: Mobile banking integration
- **Rocket**: Mobile banking integration  
- **Card**: Visa/MasterCard via Stripe

Payment flow:
1. Student initiates enrollment
2. Payment record created with PENDING status
3. Payment gateway redirect (to be implemented)
4. Payment verification via webhook/API
5. Enrollment activated upon successful payment

## 🌐 Internationalization

The app supports English and Bangla:
- Language switcher in navigation
- Bilingual content for courses, blogs, notices
- SEO-friendly multilingual URLs

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard pages
│   ├── student/           # Student dashboard pages
│   ├── teacher/           # Teacher dashboard pages
│   ├── auth/              # Authentication pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── home/             # Homepage components
│   ├── student/          # Student-specific components
│   ├── teacher/          # Teacher-specific components
│   └── admin/            # Admin-specific components
├── lib/                   # Utility libraries
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # NextAuth configuration
│   ├── utils.ts          # Utility functions
│   └── i18n.ts           # Internationalization
├── prisma/                # Database schema
│   └── schema.prisma     # Prisma schema file
└── types/                 # TypeScript type definitions
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database

For production, use a managed PostgreSQL service:
- **Vercel Postgres**
- **Supabase**
- **Neon**
- **Railway**
- **AWS RDS**

Update `DATABASE_URL` in your production environment variables.

## 🔒 Security Best Practices

- ✅ HTTPS only in production
- ✅ Password hashing with bcrypt
- ✅ JWT-based sessions
- ✅ Role-based access control
- ✅ Input validation with Zod
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection
- ✅ CSRF protection (NextAuth)

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:migrate     # Create migration
npm run db:studio      # Open Prisma Studio
```

## 📚 API Routes

- `POST /api/auth/signup` - User registration
- `GET /api/auth/[...nextauth]` - NextAuth endpoints
- `GET /api/courses` - List courses
- `GET /api/courses/[id]` - Get course details
- `POST /api/enrollments/create` - Enroll in course
- `POST /api/payments/create` - Create payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/student/dashboard` - Student dashboard data
- `GET /api/teacher/dashboard` - Teacher dashboard data
- `GET /api/admin/dashboard` - Admin dashboard data

## 🎨 UI Components

The app uses:
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Swiper.js** for sliders
- **Lucide React** for icons
- **React Hook Form** for forms
- **Zod** for validation

## 🤝 Contributing

This is a production-ready codebase. When contributing:
1. Follow the existing code style
2. Write clear, commented code
3. Test your changes
4. Update documentation as needed

## 📄 License

[Add your license here]

## 👥 Support

For support, email info@thechampions.edu or create an issue in the repository.

---

Built with ❤️ for The Champions - Academic and Admission Care

