# Rivalries

**Maybe you're your own rival.**

A social accountability and progress tracking platform for developers, students, and self-learners.

## 🚀 Features

- **Auto-Sync Progress**: Connect GitHub, LeetCode, and Codeforces - we track your progress automatically
- **Daily XP System**: Every commit, every problem solved translates to XP
- **College Leaderboards**: Compete with your classmates
- **Private Groups**: Create accountability circles with friends
- **AI Goal Planner**: Set targets and get personalized roadmaps
- **Streaks & Rewards**: Build momentum and maintain consistency

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL with Drizzle ORM
- **Deployment**: Vercel (Frontend), Supabase (Backend)
- **APIs**: GitHub API, LeetCode API, Codeforces API

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd rivalries
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:

Create a \`.env.local\` file in the root directory and add your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=your_database_url

# Optional: For OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
\`\`\`

4. Run database migrations:
\`\`\`bash
npm run db:push
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

### Using Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Get your database URL from Settings > Database
4. Add these to your \`.env.local\` file
5. Run migrations: \`npm run db:push\`

### Schema

The database schema includes:
- Users
- Colleges
- Groups & Group Members
- Daily Activity Logs
- Goals
- Custom Tasks
- Platform Sync Status

See \`lib/db/schema.ts\` for the complete schema definition.

## 🔧 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run db:push\` - Push database schema to Supabase
- \`npm run db:studio\` - Open Drizzle Studio for database management

## 🎨 Design Philosophy

- **Dark Theme**: Minimalist black background with artistic touches
- **Typography**: Handjet font for headings, Inter for body text
- **Animations**: Subtle, purposeful animations using Framer Motion
- **Empty Space**: Generous whitespace for a clean, artistic feel
- **Components**: Inspired by MagicUI and Aceternity for modern, animated UI

## 📱 Pages

- **Landing Page** (\`/\`): Hero section with artistic mirror sketch, features, how it works, CTA
- **Sign In/Up** (\`/auth/signin\`, \`/auth/signup\`): Authentication pages
- **Dashboard** (\`/dashboard\`): Main user dashboard with stats, charts, recent activity
- **Leaderboard** (\`/leaderboard\`): College/friend leaderboards
- **Groups** (\`/groups\`): Create and join accountability groups
- **Goals** (\`/goals\`): Set and track goals with AI planning

## 🔌 API Routes

- \`POST /api/sync/github\` - Sync GitHub activity
- \`POST /api/sync/leetcode\` - Sync LeetCode progress
- \`POST /api/sync/codeforces\` - Sync Codeforces activity
- \`POST /api/xp/calculate\` - Calculate daily XP

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

The project is optimized for Vercel with automatic deployments on push.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For support, email support@rivalries.app or join our Discord community.

---

Built with ❤️ by developers, for developers.
