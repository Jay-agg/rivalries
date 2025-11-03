# Rivalries - Setup Guide

This guide will help you set up the Rivalries project from scratch.

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Fill in:
   - Project name: `rivalries`
   - Database password: (generate a strong password)
   - Region: Choose closest to your users
4. Wait for the project to be created (~2 minutes)

### 1.2 Get Your Credentials

1. Go to Settings > API
2. Copy these values:
   - **Project URL** (looks like: `https://xxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`)

3. Go to Settings > Database
4. Copy the **Connection string** in "URI" format
   - Click "Use connection pooling" and select "Session mode"
   - Copy the connection string

### 1.3 Configure Environment Variables

1. In your project root, you should already have `.env.local`
2. Update it with your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres
\`\`\`

### 1.4 Set Up Authentication Providers (Optional)

#### GitHub OAuth:
1. Go to Supabase Dashboard > Authentication > Providers
2. Enable GitHub provider
3. Go to GitHub > Settings > Developer settings > OAuth Apps
4. Create new OAuth App:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
5. Copy Client ID and Client Secret
6. Paste them in Supabase GitHub provider settings
7. Update `.env.local`:
\`\`\`env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
\`\`\`

#### Google OAuth:
1. Go to Supabase Dashboard > Authentication > Providers
2. Enable Google provider
3. Follow the instructions to create OAuth credentials in Google Cloud Console
4. Add the credentials to Supabase

## Step 2: Database Setup

### 2.1 Push Schema to Database

Run the following command to create all tables in your Supabase database:

\`\`\`bash
npm run db:push
\`\`\`

This will create:
- users
- colleges
- groups
- group_members
- daily_activity_logs
- goals
- custom_tasks
- platform_sync_status

### 2.2 Verify Database (Optional)

You can verify the tables were created:

1. Go to Supabase Dashboard > Table Editor
2. You should see all the tables listed

Or use Drizzle Studio:

\`\`\`bash
npm run db:studio
\`\`\`

This opens a visual database browser at `https://local.drizzle.studio`

## Step 3: Run the Application

### 3.1 Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The app will be available at [http://localhost:3000](http://localhost:3000)

### 3.2 Test the Landing Page

1. Open http://localhost:3000
2. You should see the dark-themed landing page with:
   - Animated hero section
   - Mirror sketch artwork
   - Features section
   - How it works
   - CTA section
   - Footer

### 3.3 Test Authentication

1. Click "ready to face yourself?" button
2. Try signing up with email/password
3. Check your email for confirmation (if email is configured in Supabase)
4. Or try OAuth with GitHub/Google (if configured)

### 3.4 Test Dashboard

1. After signing in, you should be redirected to `/dashboard`
2. You'll see:
   - Stats cards (Total XP, Streak, Rank, Growth)
   - Activity chart
   - Recent activity feed
   - Quick actions

## Step 4: Production Deployment

### 4.1 Vercel Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables (same as `.env.local` but without the `.local` suffix)
6. Deploy!

### 4.2 Update Supabase URLs

After deploying to Vercel:

1. Get your production URL (e.g., `https://rivalries.vercel.app`)
2. Go to Supabase > Authentication > URL Configuration
3. Add your production URL to:
   - Site URL
   - Redirect URLs

## Step 5: Populate Sample Data (Optional)

To see the leaderboard and activity in action, you can manually add sample data:

### Via Drizzle Studio:

\`\`\`bash
npm run db:studio
\`\`\`

Then add some sample colleges, users, and activity logs.

### Via Supabase SQL Editor:

Go to Supabase Dashboard > SQL Editor and run:

\`\`\`sql
-- Insert sample college
INSERT INTO colleges (name, domain) VALUES 
('MIT', 'mit.edu'),
('Stanford', 'stanford.edu'),
('Berkeley', 'berkeley.edu');

-- Insert sample activity logs (adjust user_id to your actual user ID)
INSERT INTO daily_activity_logs (user_id, date, github_commits, leetcode_solved, total_xp) 
VALUES 
('your-user-id', '2025-11-01', 5, 2, 25),
('your-user-id', '2025-11-02', 3, 1, 14),
('your-user-id', '2025-11-03', 7, 3, 36);
\`\`\`

## Troubleshooting

### Issue: "Invalid API credentials"
- Double-check your Supabase URL and keys in `.env.local`
- Make sure you're using the correct anon key (not service role key)
- Restart the dev server after changing environment variables

### Issue: Database connection failed
- Verify your DATABASE_URL is correct
- Make sure you're using the connection pooling URL
- Check that your database password doesn't have special characters that need encoding

### Issue: OAuth not working
- Verify redirect URLs in both Supabase and OAuth provider settings
- Make sure you've enabled the provider in Supabase
- Check that client ID and secret are correct

### Issue: Styles not loading
- Clear your browser cache
- Check that Tailwind CSS is configured correctly
- Run \`npm run dev\` to ensure the dev server is running

### Issue: TypeScript errors
- Run \`npm install\` to ensure all dependencies are installed
- Check that you're using Node.js 18 or higher
- Restart your IDE/editor

## Next Steps

1. **Configure Cron Jobs**: Set up Supabase Edge Functions to sync user data periodically
2. **Add Sample Colleges**: Populate the colleges table with real universities
3. **Customize XP Weights**: Adjust XP values in \`lib/utils.ts\` based on your preferences
4. **Add AI Goal Planning**: Integrate OpenAI or similar for goal planning feature
5. **Set Up Analytics**: Add Vercel Analytics or Google Analytics
6. **Email Notifications**: Configure Supabase email templates for notifications

## Support

If you run into any issues:
1. Check the [GitHub Issues](your-repo-issues-url)
2. Join our Discord community
3. Email support@rivalries.app

Happy coding! 🚀

