// i18n utility functions for App Router
// Note: For App Router, we use a custom translation system

// Translation keys for the application
export const translations = {
  en: {
    common: {
      home: 'Home',
      about: 'About',
      courses: 'Courses',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      update: 'Update',
      search: 'Search',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    auth: {
      signin: 'Sign In',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember Me',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
    },
    student: {
      myCourses: 'My Courses',
      enrollments: 'Enrollments',
      payments: 'Payments',
      assignments: 'Assignments',
      messages: 'Messages',
      progress: 'Progress',
    },
    teacher: {
      myCourses: 'My Courses',
      students: 'Students',
      content: 'Content',
      analytics: 'Analytics',
    },
    admin: {
      users: 'Users',
      courses: 'Courses',
      payments: 'Payments',
      analytics: 'Analytics',
      settings: 'Settings',
    },
  },
  bn: {
    common: {
      home: 'হোম',
      about: 'আমাদের সম্পর্কে',
      courses: 'কোর্সসমূহ',
      contact: 'যোগাযোগ',
      login: 'লগইন',
      signup: 'নিবন্ধন',
      logout: 'লগআউট',
      dashboard: 'ড্যাশবোর্ড',
      profile: 'প্রোফাইল',
      settings: 'সেটিংস',
      save: 'সংরক্ষণ',
      cancel: 'বাতিল',
      delete: 'মুছে ফেলা',
      edit: 'সম্পাদনা',
      create: 'তৈরি করুন',
      update: 'আপডেট',
      search: 'খুঁজুন',
      loading: 'লোড হচ্ছে...',
      error: 'ত্রুটি',
      success: 'সফল',
    },
    auth: {
      signin: 'সাইন ইন',
      signup: 'নিবন্ধন',
      email: 'ইমেইল',
      password: 'পাসওয়ার্ড',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      rememberMe: 'মনে রাখুন',
      noAccount: 'অ্যাকাউন্ট নেই?',
      hasAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    },
    student: {
      myCourses: 'আমার কোর্স',
      enrollments: 'নিবন্ধন',
      payments: 'পেমেন্ট',
      assignments: 'অ্যাসাইনমেন্ট',
      messages: 'বার্তা',
      progress: 'অগ্রগতি',
    },
    teacher: {
      myCourses: 'আমার কোর্স',
      students: 'ছাত্র',
      content: 'কন্টেন্ট',
      analytics: 'বিশ্লেষণ',
    },
    admin: {
      users: 'ব্যবহারকারী',
      courses: 'কোর্স',
      payments: 'পেমেন্ট',
      analytics: 'বিশ্লেষণ',
      settings: 'সেটিংস',
    },
  },
}

export function getTranslation(locale: 'en' | 'bn', key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

