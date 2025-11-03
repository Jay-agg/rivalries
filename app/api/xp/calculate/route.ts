import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { calculateXP } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const activity = await request.json()

    const totalXp = calculateXP(activity)

    // In production, save this to the database
    // await db.insert(dailyActivityLogs).values({
    //   userId: user.id,
    //   date: new Date().toISOString().split('T')[0],
    //   githubCommits: activity.githubCommits || 0,
    //   leetcodeSolved: activity.leetcodeSolved || 0,
    //   codeforcesParticipation: activity.codeforcesParticipation || 0,
    //   twitterPosts: activity.tweets || 0,
    //   customTaskScore: activity.customTasks || 0,
    //   totalXp,
    // })

    return NextResponse.json({
      success: true,
      totalXp,
      breakdown: {
        github: (activity.githubCommits || 0) * 3,
        leetcode: (activity.leetcodeSolved || 0) * 5,
        codeforces: (activity.codeforcesParticipation || 0) * 20,
        twitter: (activity.tweets || 0) * 2,
        custom: (activity.customTasks || 0) * 10,
      },
    })

  } catch (error: any) {
    console.error("XP calculation error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

