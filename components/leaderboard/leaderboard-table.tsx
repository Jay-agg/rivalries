"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  username: string
  totalXp: number
  streak: number
  avatarUrl?: string
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
}

export function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />
    return null
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-500/20 to-transparent"
    if (rank === 2) return "from-gray-500/20 to-transparent"
    if (rank === 3) return "from-amber-600/20 to-transparent"
    return "from-white/5 to-transparent"
  }

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl" style={{ fontFamily: "'Handjet', cursive" }}>
          College Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {entries.map((entry) => {
            const isCurrentUser = entry.userId === currentUserId
            
            return (
              <div
                key={entry.userId}
                className={`flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r ${getRankColor(entry.rank)} border transition-all hover:scale-[1.02] ${
                  isCurrentUser ? "border-white/30" : "border-white/10"
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10">
                  {getRankIcon(entry.rank) || (
                    <span className="text-lg font-bold text-white" style={{ fontFamily: "'Handjet', cursive" }}>
                      {entry.rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {entry.avatarUrl ? (
                    <img src={entry.avatarUrl} alt={entry.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    entry.name.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">
                    {entry.name}
                    {isCurrentUser && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">You</span>
                    )}
                  </p>
                  <p className="text-white/60 text-sm">@{entry.username}</p>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Handjet', cursive" }}>
                    {entry.totalXp}
                  </p>
                  <p className="text-white/60 text-sm">
                    🔥 {entry.streak} day streak
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

