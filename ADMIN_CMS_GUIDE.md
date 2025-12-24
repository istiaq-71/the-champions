# 🎯 Admin CMS Guide - No Coding Required!

## Overview
Your website now has a comprehensive Admin CMS panel where you and your team can manage everything **without writing any code**!

---

## 🚀 Access Admin Panel

1. **Login** with admin credentials:
   - Email: `admin@thechampions.edu`
   - Password: `admin123`

2. **Navigate** to Admin Dashboard:
   - Click "Admin Dashboard" in navigation
   - Or go to: `http://localhost:3000/admin`

---

## 📋 Available Features

### 1. **Programs Management** (`/admin/programs`)

#### Create New Program
- Click **"Add New Program"** button
- Fill in the form:
  - **Basic Info**: Title (English & Bengali), Slug, Class
  - **Description**: English & Bengali descriptions
  - **Features**: Add/remove program features/benefits
  - **Pricing**: Set price type (Paid/Free), amount, course type (Online/Offline/Hybrid)
  - **Settings**: Duration, Level, Order, Status, Teacher assignment
  - **Thumbnail**: Upload or add image URL

#### Edit Program
- Click **Edit** icon (pencil) next to any program
- Modify any field
- Save changes

#### Delete Program
- Click **Delete** icon (trash) next to any program
- Confirm deletion

#### View Program
- Click **View** icon (eye) to see how it looks on the website

#### Filter & Search
- Use search bar to find programs by title/slug
- Filter by status (Published/Draft/Archived)

---

### 2. **Users Management** (`/admin/users`)
- View all users (Students, Teachers, Admins)
- Create new users
- Edit user information
- Manage user roles

### 3. **Payments Management** (`/admin/payments`)
- View all payments
- Filter by status (Pending/Completed/Failed)
- Track revenue

### 4. **Blog Management** (`/admin/blog`)
- Create and manage blog posts
- Edit content
- Publish/unpublish posts

### 5. **Notices Management** (`/admin/notices`)
- Create notices
- Set priority levels
- Publish announcements

### 6. **Analytics** (`/admin/analytics`)
- View website statistics
- Track user engagement
- Monitor performance

### 7. **Settings** (`/admin/settings`)
- Configure website settings
- Manage site-wide options

---

## 🎨 Adding Demo Programs (Udvash Style)

To add pre-built demo programs matching Udvash style:

```bash
npm run db:seed:demo
```

This will create:
- প্যারালাল Text (ষষ্ঠ-দ্বাদশ)
- ইঞ্জিনিয়ারিং মডেল টেস্ট প্যাকেজ- 2025
- ভার্সিটি 'ক' মডেল টেস্ট প্যাকেজ ২০২৫
- ভার্সিটি 'খ' মডেল টেস্ট প্যাকেজ- 2025
- SSC 2026 মডেল টেস্ট প্রোগ্রাম
- HSC 2026 ফাইনাল রিভিশন কোর্স
- HSC 2026 মডেল টেস্ট

---

## 📝 Tips for Content Management

### Program Features
- Add bullet points one by one
- Press Enter to add a new feature
- Click X to remove a feature
- Features appear on program cards

### Descriptions
- Use clear, concise descriptions
- Add Bengali translations for better accessibility
- Include key information students need

### Images
- Use high-quality images
- Recommended size: 800x600px
- Upload to Firebase Storage or use external URLs
- Image URLs should be publicly accessible

### Ordering
- Lower order numbers appear first
- Use order to control program display sequence
- Default is 0

### Status
- **Draft**: Work in progress, not visible to public
- **Published**: Visible to all users
- **Archived**: Hidden from main listings

---

## 🔐 Security

- Only users with **ADMIN** role can access admin panel
- All API routes are protected
- Session-based authentication
- Input validation on all forms

---

## 💡 Best Practices

1. **Test before publishing**: Create as draft first, then publish
2. **Use meaningful slugs**: Auto-generated from title, but you can customize
3. **Add Bengali content**: For better user experience
4. **Set appropriate prices**: Use 0 for free programs
5. **Choose right class**: Helps students filter programs
6. **Add features**: Makes programs more attractive
7. **Upload images**: Visual content increases engagement

---

## 🆘 Troubleshooting

### Can't access admin panel?
- Check if you're logged in with admin account
- Verify role is "ADMIN" in database

### Program not showing on homepage?
- Check if status is "published"
- Verify program has valid teacher assigned
- Check if filters match program class/type

### Can't delete program?
- Check if program has active enrollments
- Verify you have admin permissions

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify database connection
3. Check API routes are working
4. Ensure all required fields are filled

---

**Enjoy managing your website easily! 🎉**

