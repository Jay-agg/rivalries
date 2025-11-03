import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { username } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "LeetCode username is required" }, { status: 400 })
    }

    // Using community LeetCode API
    const apiUrl = process.env.LEETCODE_API_URL || "https://leetcode-api-faisalshohag.vercel.app"
    const response = await fetch(`${apiUrl}/${username}`)

    if (!response.ok) {
      return NextResponse.json({ error: "LeetCode user not found" }, { status: 404 })
    }

    const leetcodeData = await response.json()

    // Calculate problems solved today (this would need historical tracking in production)
    const totalSolved = leetcodeData.totalSolved || 0
    const easySolved = leetcodeData.easySolved || 0
    const mediumSolved = leetcodeData.mediumSolved || 0
    const hardSolved = leetcodeData.hardSolved || 0

    // Mock today's problems (in production, compare with yesterday's count)
    const problemsSolvedToday = 2 // This should be calculated from historical data

    return NextResponse.json({
      success: true,
      data: {
        username: leetcodeData.username || username,
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        ranking: leetcodeData.ranking,
        problemsSolvedToday,
        xpEarned: problemsSolvedToday * 5, // 5 XP per problem
      },
    })

  } catch (error: any) {
    console.error("LeetCode sync error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

