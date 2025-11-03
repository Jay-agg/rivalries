import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Plus, CheckCircle2, Circle } from "lucide-react"

export default async function GoalsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  // Mock goals data
  const activeGoals = [
    {
      id: "1",
      title: "Land SDE Internship",
      description: "Complete 100 LeetCode problems and build 2 full-stack projects",
      targetDate: "2025-05-01",
      progress: 65,
      targetXp: 5000,
      currentXp: 3250,
    },
    {
      id: "2",
      title: "30-Day Consistency Streak",
      description: "Code every single day for 30 days straight",
      targetDate: "2025-12-03",
      progress: 23,
      targetXp: 900,
      currentXp: 210,
    },
  ]

  const completedGoals = [
    {
      id: "3",
      title: "Master React Fundamentals",
      description: "Build 5 React projects and understand hooks deeply",
      completedDate: "2025-10-15",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Handjet', cursive" }}>
              goals
            </h1>
            <p className="text-white/60">
              Set targets. Track progress. Achieve greatness.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Goal
          </Button>
        </div>

        {/* Active Goals */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Handjet', cursive" }}>
            active goals
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeGoals.map((goal) => (
              <Card key={goal.id} className="border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-blue-500/20 mt-1">
                        <Target className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{goal.title}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">Progress</span>
                      <span className="text-white font-semibold">{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Current XP</p>
                      <p className="text-white font-bold text-lg" style={{ fontFamily: "'Handjet', cursive" }}>
                        {goal.currentXp}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Target XP</p>
                      <p className="text-white font-bold text-lg" style={{ fontFamily: "'Handjet', cursive" }}>
                        {goal.targetXp}
                      </p>
                    </div>
                  </div>

                  {/* Target Date */}
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-white/60 text-sm">
                      Target Date: <span className="text-white">{new Date(goal.targetDate).toLocaleDateString()}</span>
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Create New Goal Card */}
            <Card className="border-white/10 border-dashed bg-transparent hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center min-h-[300px]">
              <CardContent className="text-center py-8">
                <Plus className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 mb-2">Create a new goal</p>
                <p className="text-white/40 text-sm">Break down your dreams into actionable targets</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Handjet', cursive" }}>
              completed goals
            </h2>
            <div className="space-y-4">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="border-white/10 bg-green-500/5 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{goal.title}</h3>
                        <p className="text-white/60 text-sm">{goal.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60 text-xs">Completed</p>
                        <p className="text-white text-sm">{new Date(goal.completedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

