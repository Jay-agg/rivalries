import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Zap, Flame, Trophy, TrendingUp } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  // Mock data - will be replaced with actual data from database
  const stats = {
    totalXp: 1250,
    currentStreak: 7,
    rank: 42,
    weeklyProgress: 15,
  }

  const activityData = [
    { date: "2025-10-28", xp: 45 },
    { date: "2025-10-29", xp: 60 },
    { date: "2025-10-30", xp: 30 },
    { date: "2025-10-31", xp: 75 },
    { date: "2025-11-01", xp: 50 },
    { date: "2025-11-02", xp: 90 },
    { date: "2025-11-03", xp: 65 },
  ]

  const recentActivities = [
    {
      id: "1",
      type: "github" as const,
      description: "Pushed 3 commits to rivalries-backend",
      xp: 9,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "2",
      type: "leetcode" as const,
      description: "Solved: Two Sum (Easy)",
      xp: 5,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "3",
      type: "codeforces" as const,
      description: "Participated in Codeforces Round #900",
      xp: 20,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Handjet', cursive" }}>
            welcome back!
          </h1>
          <p className="text-white/60">
            Keep the momentum going. Every day counts.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total XP"
            value={stats.totalXp}
            icon={Zap}
            trend={{ value: stats.weeklyProgress, isPositive: true }}
          />
          <StatsCard
            title="Current Streak"
            value={`${stats.currentStreak} days`}
            icon={Flame}
            description="Keep it up!"
          />
          <StatsCard
            title="College Rank"
            value={`#${stats.rank}`}
            icon={Trophy}
            description="Out of 250 students"
          />
          <StatsCard
            title="Weekly Growth"
            value={`+${stats.weeklyProgress}%`}
            icon={TrendingUp}
            trend={{ value: stats.weeklyProgress, isPositive: true }}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChart data={activityData} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity activities={recentActivities} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Handjet', cursive" }}>
            quick actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/dashboard/connect"
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-center"
            >
              <p className="text-white font-semibold">Connect Accounts</p>
              <p className="text-white/60 text-sm mt-1">Link GitHub, LeetCode, Codeforces</p>
            </a>
            <a
              href="/groups"
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-center"
            >
              <p className="text-white font-semibold">Join Groups</p>
              <p className="text-white/60 text-sm mt-1">Find accountability partners</p>
            </a>
            <a
              href="/goals"
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-center"
            >
              <p className="text-white font-semibold">Set Goals</p>
              <p className="text-white/60 text-sm mt-1">Plan your journey</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

