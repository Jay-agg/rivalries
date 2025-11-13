import { NextResponse } from "next/server"
import { groq } from "@/lib/ai/groq-client"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get weekly data from request body
    const body = await request.json()
    const { problemsSolved, xpGained, streakDays, topLanguages, comparison } = body

    // Validate input
    if (typeof problemsSolved !== "number" || typeof xpGained !== "number") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Generate AI summary
    const summary = await groq.generateWeeklySummary({
      problemsSolved,
      xpGained,
      streakDays: streakDays || 0,
      topLanguages: topLanguages || [],
      comparison: comparison || "similar to last week",
    })

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("AI summary generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    )
  }
}

