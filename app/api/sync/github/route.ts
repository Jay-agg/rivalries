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
      return NextResponse.json({ error: "GitHub username is required" }, { status: 400 })
    }

    // Fetch GitHub user data
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 })
    }

    const githubData = await response.json()

    // Fetch recent commits (from all repos)
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    const events = await eventsResponse.json()
    
    // Count push events (commits) from today
    const today = new Date().toDateString()
    const pushEvents = events.filter((event: any) => 
      event.type === 'PushEvent' && 
      new Date(event.created_at).toDateString() === today
    )

    const commitsToday = pushEvents.reduce((total: number, event: any) => 
      total + (event.payload?.commits?.length || 0), 0
    )

    return NextResponse.json({
      success: true,
      data: {
        username: githubData.login,
        name: githubData.name,
        avatarUrl: githubData.avatar_url,
        publicRepos: githubData.public_repos,
        commitsToday,
        xpEarned: commitsToday * 3, // 3 XP per commit
      },
    })

  } catch (error: any) {
    console.error("GitHub sync error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

