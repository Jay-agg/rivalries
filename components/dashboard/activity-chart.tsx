"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ActivityData {
  date: string
  xp: number
}

interface ActivityChartProps {
  data: ActivityData[]
}

export function ActivityChart({ data }: ActivityChartProps) {
  const maxXp = Math.max(...data.map(d => d.xp), 1)
  
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader>
        <CardTitle style={{ fontFamily: "'Handjet', cursive" }}>Weekly Activity</CardTitle>
        <CardDescription>Your XP progress over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-48">
          {data.map((item, index) => {
            const height = (item.xp / maxXp) * 100
            const date = new Date(item.date)
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-40">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80 relative group"
                    style={{ height: `${height}%`, minHeight: item.xp > 0 ? '4px' : '0' }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      {item.xp} XP
                    </div>
                  </div>
                </div>
                <span className="text-xs text-white/50">{dayName}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

