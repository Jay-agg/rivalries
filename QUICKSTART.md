# Rivalries - Quick Start Guide

Get your Rivalries platform running in 5 minutes!

## 🚀 Option 1: Test Locally (No Database)

This option lets you see the UI without setting up Supabase.

### Step 1: Start the Dev Server
\`\`\`bash
npm run dev
\`\`\`

### Step 2: Visit the Site
Open http://localhost:3000

You'll see:
- ✅ Landing page with all sections
- ✅ Sign up/Sign in pages (UI only)
- ❌ Dashboard will redirect to sign-in (needs auth)

---

## ⚡ Option 2: Full Setup (With Database)

This gives you the complete experience with authentication and data.

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name it "rivalries"
4. Set a strong password
5. Choose your region
6. Wait ~2 minutes for setup

### Step 2: Get Credentials

In Supabase Dashboard:

**Settings > API:**
- Copy Project URL
- Copy anon/public key
- Copy service_role key

**Settings > Database:**
- Click "Connection string"
- Select "Connection pooling" → "Session mode"
- Copy the URI

### Step 3: Configure Environment

Edit `.env.local` in your project root:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-key
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### Step 4: Set Up Database

\`\`\`bash
npm run db:push
\`\`\`

You should see:
\`\`\`
✓ Schema pushed successfully
\`\`\`

### Step 5: Start the App

\`\`\`bash
npm run dev
\`\`\`

### Step 6: Create an Account

1. Open http://localhost:3000
2. Click "ready to face yourself?"
3. Sign up with email/password
4. Check your email for confirmation
5. Or use the confirmation link in terminal

### Step 7: Explore!

You now have access to:
- ✅ Dashboard with stats
- ✅ Leaderboard
- ✅ Groups
- ✅ Goals
- ✅ Full authentication

---

## 🎯 What You Can Do Now

### 1. Customize the Landing Page
Edit: `app/page.tsx` and `components/landing/hero.tsx`

Change the tagline, stats, or hero image.

### 2. Modify XP Values
Edit: `lib/utils.ts`

Change XP weights:
\`\`\`typescript
githubCommits * 3     // Change 3 to any value
leetcodeSolved * 5    // Change 5 to any value
\`\`\`

### 3. Add Sample Data
Open Drizzle Studio:
\`\`\`bash
npm run db:studio
\`\`\`

Add colleges, activity logs, or goals.

### 4. Test API Routes
Use Postman or curl:

\`\`\`bash
# Test GitHub sync (requires auth token)
curl -X POST http://localhost:3000/api/sync/github \\
  -H "Content-Type: application/json" \\
  -d '{"username": "your-github-username"}'
\`\`\`

---

## 🎨 Customization Ideas

### Change Color Scheme
Edit: `app/globals.css`

\`\`\`css
:root {
  --background: #000000;  /* Change to any color */
  --accent: #3b82f6;      /* Change accent color */
}
\`\`\`

### Change Fonts
Edit: `app/globals.css`

\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');

@theme inline {
  --font-display: 'YourFont', cursive;
}
\`\`\`

### Add New Features
Create new pages in `app/` directory. Next.js automatically creates routes.

---

## 🐛 Common Issues

### "Module not found"
\`\`\`bash
rm -rf node_modules
npm install
\`\`\`

### "Invalid Supabase credentials"
- Check `.env.local` for typos
- Restart dev server after changing env vars
- Verify keys in Supabase dashboard

### "Database connection failed"
- Check DATABASE_URL format
- Ensure password doesn't have special chars
- Use connection pooling URL

### Styles not loading
\`\`\`bash
rm -rf .next
npm run dev
\`\`\`

---

## 📚 Learn More

- **README.md** - Overview and features
- **SETUP.md** - Detailed setup instructions
- **DEPLOYMENT.md** - How to deploy to production
- **PROJECT_SUMMARY.md** - Complete technical documentation

---

## 🎉 You're Ready!

Your Rivalries platform is now running. Start building your developer community!

**Next Steps:**
1. Customize the design
2. Add your college/university data
3. Invite friends to test
4. Deploy to production (see DEPLOYMENT.md)
5. Share on social media!

---

**Need help?** Create an issue on GitHub or join our Discord.

Happy coding! 🚀

