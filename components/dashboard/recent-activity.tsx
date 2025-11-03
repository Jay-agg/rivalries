"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Code, Trophy, Twitter } from "lucide-react"

interface Activity {
  id: string
  type: "github" | "leetcode" | "codeforces" | "twitter"
  description: string
  xp: number
  timestamp: string
}

interface RecentActivityProps {
  activities: Activity[]
}

const activityIcons = {
  github: Github,
  leetcode: Code,
  codeforces: Trophy,
  twitter: Twitter,
}

const activityColors = {
  github: "text-purple-400",
  leetcode: "text-yellow-400",
  codeforces: "text-blue-400",
  twitter: "text-cyan-400",
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader>
        <CardTitle style={{ fontFamily: "'Handjet', cursive" }}>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-white/50 text-sm text-center py-8">
              No activity yet. Start coding to see your progress here!
            </p>
          ) : (
            activities.map((activity) => {
              const Icon = activityIcons[activity.type]
              const colorClass = activityColors[activity.type]
              
              return (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-white/5 ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.description}</p>
                    <p className="text-xs text-white/50 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-white/80">
                    +{activity.xp} XP
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}

