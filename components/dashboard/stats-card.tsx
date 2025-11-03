"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({ title, value, icon: Icon, description, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/70">{title}</CardTitle>
        <Icon className="w-4 h-4 text-white/50" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Handjet', cursive" }}>
          {value}
        </div>
        {description && (
          <p className="text-xs text-white/50 mt-1">{description}</p>
        )}
        {trend && (
          <p className={cn(
            "text-xs mt-2",
            trend.isPositive ? "text-green-500" : "text-red-500"
          )}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last week
          </p>
        )}
      </CardContent>
    </Card>
  )
}

