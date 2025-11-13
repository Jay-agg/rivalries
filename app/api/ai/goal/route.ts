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

    // Get user's stats from request body
    const body = await request.json()
    const { weeklyProblems, strongestTopic, weakestTopic, currentStreak } = body

    // Validate input
    if (typeof weeklyProblems !== "number" || !strongestTopic || !weakestTopic) {
      return NextResponse.json(
        { error: "Missing required fields: weeklyProblems, strongestTopic, weakestTopic" },
        { status: 400 }
      )
    }

    // Generate AI goal
    const goal = await groq.generateGoal({
      weeklyProblems,
      strongestTopic,
      weakestTopic,
      currentStreak: currentStreak || 0,
    })

    return NextResponse.json({ goal })
  } catch (error) {
    console.error("AI goal generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate goal" },
      { status: 500 }
    )
  }
}

