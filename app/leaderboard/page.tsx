import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"

export default async function LeaderboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  // Mock leaderboard data - will be replaced with actual data from database
  const leaderboardEntries = [
    {
      rank: 1,
      userId: "user1",
      name: "Alex Chen",
      username: "alexchen",
      totalXp: 2450,
      streak: 15,
    },
    {
      rank: 2,
      userId: "user2",
      name: "Sarah Johnson",
      username: "sarahj",
      totalXp: 2200,
      streak: 12,
    },
    {
      rank: 3,
      userId: "user3",
      name: "Michael Brown",
      username: "mikeb",
      totalXp: 1980,
      streak: 10,
    },
    {
      rank: 4,
      userId: user.id,
      name: "You",
      username: "yourname",
      totalXp: 1250,
      streak: 7,
    },
    {
      rank: 5,
      userId: "user5",
      name: "Emily Davis",
      username: "emilyd",
      totalXp: 1150,
      streak: 8,
    },
    {
      rank: 6,
      userId: "user6",
      name: "David Wilson",
      username: "davidw",
      totalXp: 1050,
      streak: 5,
    },
    {
      rank: 7,
      userId: "user7",
      name: "Jessica Garcia",
      username: "jessicag",
      totalXp: 980,
      streak: 6,
    },
    {
      rank: 8,
      userId: "user8",
      name: "Ryan Martinez",
      username: "ryanm",
      totalXp: 920,
      streak: 4,
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Handjet', cursive" }}>
            leaderboard
          </h1>
          <p className="text-white/60">
            See how you stack up against your peers. Competition breeds excellence.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="px-4 py-2 rounded-lg bg-white text-black font-semibold">
            College
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all">
            Friends
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all">
            Global
          </button>
        </div>

        {/* Leaderboard */}
        <LeaderboardTable entries={leaderboardEntries} currentUserId={user.id} />

        {/* Your Progress */}
        <div className="mt-8 p-6 rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Handjet', cursive" }}>
            your progress
          </h2>
          <p className="text-white/70 mb-4">
            You&apos;re rank #4 in your college. Keep grinding to break into the top 3!
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: "65%" }} />
            </div>
            <span className="text-white font-semibold">65% to rank #3</span>
          </div>
        </div>
      </main>
    </div>
  )
}

