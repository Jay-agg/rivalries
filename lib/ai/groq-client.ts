/**
 * Groq AI Client for Rivalries
 * 
 * Free, fast LLM inference using Groq
 * Models: Llama 3, Mixtral, Gemma
 * Speed: 300+ tokens/second
 */

interface GroqMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export class GroqClient {
  private apiKey: string
  private baseUrl = "https://api.groq.com/openai/v1"

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GROQ_API_KEY || ""
    if (!this.apiKey) {
      console.warn("GROQ_API_KEY not set. AI features will not work.")
    }
  }

  async chat(messages: GroqMessage[], model = "llama-3.1-8b-instant"): Promise<string> {
    if (!this.apiKey) {
      throw new Error("Groq API key not configured")
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`)
      }

      const data: GroqResponse = await response.json()
      return data.choices[0]?.message?.content || ""
    } catch (error) {
      console.error("Groq API error:", error)
      throw error
    }
  }

  /**
   * Generate a personalized goal based on user's progress
   */
  async generateGoal(userStats: {
    weeklyProblems: number
    strongestTopic: string
    weakestTopic: string
    currentStreak: number
  }): Promise<string> {
    const messages: GroqMessage[] = [
      {
        role: "system",
        content: `You are an AI coding coach for Rivalries, a platform that gamifies coding practice. 
Generate short, motivating, achievable goals for users. Keep responses under 100 words.
Be encouraging but realistic.`
      },
      {
        role: "user",
        content: `User stats:
- Solves ${userStats.weeklyProblems} problems/week
- Strong in: ${userStats.strongestTopic}
- Weak in: ${userStats.weakestTopic}
- Current streak: ${userStats.currentStreak} days

Suggest ONE specific, achievable goal for the next 7 days.`
      }
    ]

    return this.chat(messages)
  }

  /**
   * Generate weekly progress insights
   */
  async generateWeeklySummary(weekData: {
    problemsSolved: number
    xpGained: number
    streakDays: number
    topLanguages: string[]
    comparison: string // "up 20% from last week" or "down 10%"
  }): Promise<string> {
    const messages: GroqMessage[] = [
      {
        role: "system",
        content: `You are an AI progress analyst for Rivalries. Generate encouraging, 
data-driven summaries of user's weekly coding progress. Keep it under 150 words.
Be specific with numbers and celebrate wins.`
      },
      {
        role: "user",
        content: `Week's data:
- Problems solved: ${weekData.problemsSolved}
- XP gained: ${weekData.xpGained}
- Streak maintained: ${weekData.streakDays} days
- Top languages: ${weekData.topLanguages.join(", ")}
- Trend: ${weekData.comparison}

Generate an encouraging summary with actionable insights.`
      }
    ]

    return this.chat(messages)
  }

  /**
   * Analyze coding patterns and suggest improvements
   */
  async analyzePracticePattern(activityData: {
    problemsByDifficulty: { easy: number; medium: number; hard: number }
    topicDistribution: Record<string, number>
    practiceFrequency: string // "consistent" | "sporadic" | "weekend-focused"
  }): Promise<string> {
    const messages: GroqMessage[] = [
      {
        role: "system",
        content: `You are an AI coach analyzing coding practice patterns. 
Provide 2-3 specific, actionable recommendations. Under 120 words.`
      },
      {
        role: "user",
        content: `Practice data:
- Easy: ${activityData.problemsByDifficulty.easy}, Medium: ${activityData.problemsByDifficulty.medium}, Hard: ${activityData.problemsByDifficulty.hard}
- Topics: ${JSON.stringify(activityData.topicDistribution)}
- Pattern: ${activityData.practiceFrequency}

What should they focus on?`
      }
    ]

    return this.chat(messages)
  }

  /**
   * Generate a friendly challenge between two users
   */
  async generateChallenge(user1: {
    name: string
    strongestTopic: string
    avgProblemsPerWeek: number
  }, user2: {
    name: string
    strongestTopic: string
    avgProblemsPerWeek: number
  }): Promise<string> {
    const messages: GroqMessage[] = [
      {
        role: "system",
        content: `You are an AI challenge creator for Rivalries. 
Create fun, competitive, balanced challenges between friends. Under 100 words.
Make it exciting and fair for both skill levels.`
      },
      {
        role: "user",
        content: `Create a 7-day challenge:
User 1: ${user1.name} - Strong in ${user1.strongestTopic} - Avg ${user1.avgProblemsPerWeek}/week
User 2: ${user2.name} - Strong in ${user2.strongestTopic} - Avg ${user2.avgProblemsPerWeek}/week

Design a balanced, fun challenge.`
      }
    ]

    return this.chat(messages)
  }
}

// Export singleton instance
export const groq = new GroqClient()

