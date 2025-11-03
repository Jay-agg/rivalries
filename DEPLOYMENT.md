# Rivalries - Deployment Guide

## Quick Deployment Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database schema pushed
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] OAuth providers configured (optional)

---

## Detailed Deployment Steps

### 1. Prepare Your Supabase Project

#### 1.1 Create Supabase Project
1. Visit [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for provisioning (~2 minutes)

#### 1.2 Get Database Credentials
Go to Settings > Database and copy:
- Connection string (with connection pooling, Session mode)

#### 1.3 Get API Credentials
Go to Settings > API and copy:
- Project URL
- anon/public key
- service_role key

#### 1.4 Push Database Schema
From your local project:
\`\`\`bash
npm run db:push
\`\`\`

This creates all tables defined in `lib/db/schema.ts`.

#### 1.5 Configure Authentication
Go to Authentication > URL Configuration:
- **Site URL**: `https://your-domain.vercel.app` (will add after Vercel deployment)
- **Redirect URLs**: Add `https://your-domain.vercel.app/**`

For OAuth providers (optional):
- Go to Authentication > Providers
- Enable GitHub and/or Google
- Follow provider-specific setup instructions

---

### 2. Deploy to Vercel

#### 2.1 Push to GitHub
\`\`\`bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/rivalries.git
git push -u origin main
\`\`\`

#### 2.2 Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

#### 2.3 Add Environment Variables
In the Vercel project settings, add:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
DATABASE_URL=postgresql://postgres:...
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
\`\`\`

Optional (for OAuth):
\`\`\`
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
\`\`\`

#### 2.4 Deploy
Click "Deploy" and wait for the build to complete.

---

### 3. Post-Deployment Configuration

#### 3.1 Update Supabase URLs
Once deployed, go back to Supabase:

**Authentication > URL Configuration**:
- Site URL: `https://rivalries.vercel.app` (your actual domain)
- Redirect URLs: `https://rivalries.vercel.app/**`

**OAuth Providers** (if using):
For GitHub OAuth:
- Update callback URL: `https://your-project.supabase.co/auth/v1/callback`

#### 3.2 Test Authentication
1. Visit your deployed site
2. Try signing up with email
3. Check email for confirmation
4. Try OAuth sign-in (if configured)

#### 3.3 Test API Routes
Visit these URLs to verify:
- `https://your-domain.vercel.app/api/sync/github` (should return 401 if not authenticated)
- `https://your-domain.vercel.app/dashboard` (should redirect to sign-in)

---

### 4. Custom Domain (Optional)

#### 4.1 Add Custom Domain in Vercel
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `rivalries.app`)
4. Follow DNS configuration instructions

#### 4.2 Update Supabase URLs
After adding custom domain:
1. Update Site URL in Supabase to your custom domain
2. Update redirect URLs
3. Update OAuth callback URLs

---

### 5. Set Up Cron Jobs (Future Enhancement)

For automated daily syncing, you'll want to set up Supabase Edge Functions with cron triggers.

#### 5.1 Create Edge Function
\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Create edge function
supabase functions new daily-sync
\`\`\`

#### 5.2 Deploy Function
\`\`\`bash
supabase functions deploy daily-sync
\`\`\`

#### 5.3 Set Up Cron
In Supabase Dashboard:
1. Go to Database > Cron
2. Create a new cron job
3. Schedule it to run every 6 hours
4. Call your edge function

Example SQL:
\`\`\`sql
SELECT cron.schedule(
  'daily-sync',
  '0 */6 * * *',
  'SELECT net.http_post(
    url:=''https://your-project.supabase.co/functions/v1/daily-sync'',
    headers:=''{"Authorization": "Bearer YOUR_ANON_KEY"}''::jsonb
  );'
);
\`\`\`

---

## Monitoring & Maintenance

### Analytics
Add Vercel Analytics:
\`\`\`bash
npm install @vercel/analytics
\`\`\`

In `app/layout.tsx`:
\`\`\`typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
\`\`\`

### Error Tracking
Consider adding Sentry or similar:
\`\`\`bash
npm install @sentry/nextjs
\`\`\`

### Database Backups
Supabase automatically backs up your database:
- Go to Database > Backups in Supabase Dashboard
- Free tier: Daily backups retained for 7 days
- Pro tier: Point-in-time recovery

### Performance Monitoring
Use Vercel's built-in monitoring:
- Go to your project in Vercel
- Click "Analytics" tab
- Monitor page views, performance metrics

---

## Scaling Considerations

### When to Scale

**Signs you need to upgrade:**
- Supabase: > 500MB database size (Free tier limit)
- Vercel: > 100GB bandwidth/month (Hobby tier limit)
- API rate limits being hit consistently

### Scaling Path

**Supabase Scaling:**
1. Free → Pro ($25/mo): 8GB database, no pausing
2. Pro → Team: Custom pricing, dedicated resources

**Vercel Scaling:**
1. Hobby → Pro ($20/mo): 1TB bandwidth, advanced analytics
2. Pro → Enterprise: Custom pricing, dedicated support

### Performance Optimizations

**Database:**
- Add indexes on frequently queried columns
- Use Supabase connection pooling
- Implement caching with Redis (Upstash)

**Frontend:**
- Enable Next.js ISR for static pages
- Implement image optimization
- Use route prefetching

**API:**
- Implement rate limiting
- Cache API responses
- Use edge functions for global distribution

---

## Troubleshooting Deployment Issues

### Build Fails on Vercel

**Issue**: TypeScript errors
- Check that all types are correctly defined
- Run `npm run build` locally first
- Ensure `tsconfig.json` is configured correctly

**Issue**: Environment variables not found
- Double-check variable names (case-sensitive)
- Restart deployment after adding variables
- Use `NEXT_PUBLIC_` prefix for client-side variables

### Authentication Issues

**Issue**: OAuth redirect fails
- Verify callback URLs in both Supabase and OAuth provider
- Check that URLs match exactly (no trailing slashes)
- Ensure HTTPS is used in production

**Issue**: Email confirmation not working
- Configure SMTP in Supabase (Settings > Auth > Email)
- Or use Supabase's built-in email service
- Check spam folder

### Database Connection Issues

**Issue**: Cannot connect to database
- Verify DATABASE_URL format
- Check that you're using connection pooling URL
- Ensure IP allowlist includes Vercel's IPs (or use connection pooling)

### Performance Issues

**Issue**: Slow page loads
- Enable Next.js caching
- Optimize images (use Next.js Image component)
- Implement lazy loading for components

**Issue**: API rate limiting
- Implement caching
- Use batch requests where possible
- Upgrade Supabase plan if needed

---

## Security Best Practices

1. **Never commit `.env.local`** to Git
2. **Use Row Level Security (RLS)** in Supabase
3. **Validate all user inputs** on server side
4. **Use service role key only on server** (never expose to client)
5. **Implement rate limiting** on API routes
6. **Keep dependencies updated**: `npm audit fix`
7. **Enable HTTPS only** (Vercel does this by default)
8. **Use CSP headers** for XSS protection

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: [Your repo issues URL]
- **Discord Community**: [Your Discord invite]

---

Happy deploying! 🚀

