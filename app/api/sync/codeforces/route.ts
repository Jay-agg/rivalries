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
      return NextResponse.json({ error: "Codeforces username is required" }, { status: 400 })
    }

    // Fetch user info
    const userResponse = await fetch(
      `https://codeforces.com/api/user.info?handles=${username}`
    )

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Codeforces user not found" }, { status: 404 })
    }

    const userData = await userResponse.json()

    if (userData.status !== "OK") {
      return NextResponse.json({ error: "Invalid Codeforces username" }, { status: 404 })
    }

    const userInfo = userData.result[0]

    // Fetch recent submissions
    const submissionsResponse = await fetch(
      `https://codeforces.com/api/user.status?handle=${username}&from=1&count=100`
    )

    let contestParticipationToday = 0
    
    if (submissionsResponse.ok) {
      const submissionsData = await submissionsResponse.json()
      
      if (submissionsData.status === "OK") {
        const today = Math.floor(Date.now() / 1000) - (24 * 60 * 60)
        const recentSubmissions = submissionsData.result.filter(
          (submission: any) => submission.creationTimeSeconds > today
        )
        
        // Check if participated in contest today
        contestParticipationToday = recentSubmissions.some(
          (submission: any) => submission.author.participantType === "CONTESTANT"
        ) ? 1 : 0
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        username: userInfo.handle,
        rating: userInfo.rating || 0,
        rank: userInfo.rank || "unrated",
        maxRating: userInfo.maxRating || 0,
        maxRank: userInfo.maxRank || "unrated",
        contestParticipationToday,
        xpEarned: contestParticipationToday * 20, // 20 XP per contest
      },
    })

  } catch (error: any) {
    console.error("Codeforces sync error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

