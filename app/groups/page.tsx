import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus, Lock } from "lucide-react"

export default async function GroupsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  // Mock groups data
  const myGroups = [
    {
      id: "1",
      name: "CS Department Grinders",
      type: "college",
      memberCount: 24,
      averageXp: 850,
    },
    {
      id: "2",
      name: "The 6AM Club",
      type: "private",
      memberCount: 5,
      averageXp: 1200,
    },
  ]

  const suggestedGroups = [
    {
      id: "3",
      name: "MIT Class of 2026",
      type: "college",
      memberCount: 150,
      averageXp: 720,
    },
    {
      id: "4",
      name: "LeetCode Daily Grind",
      type: "private",
      memberCount: 42,
      averageXp: 950,
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
              groups
            </h1>
            <p className="text-white/60">
              Join accountability circles. Compete with friends. Grow together.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Group
          </Button>
        </div>

        {/* My Groups */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Handjet', cursive" }}>
            my groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myGroups.map((group) => (
              <Card key={group.id} className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        {group.type === "private" ? (
                          <Lock className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Users className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {group.type === "private" ? "Private" : "College"}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Members</span>
                      <span className="text-white font-semibold">{group.memberCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Avg XP</span>
                      <span className="text-white font-semibold">{group.averageXp}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Group
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Create New Group Card */}
            <Card className="border-white/10 border-dashed bg-transparent hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center min-h-[200px]">
              <CardContent className="text-center py-8">
                <Plus className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">Create a new group</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Suggested Groups */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Handjet', cursive" }}>
            suggested for you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedGroups.map((group) => (
              <Card key={group.id} className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        {group.type === "private" ? (
                          <Lock className="w-4 h-4 text-purple-400" />
                        ) : (
                          <Users className="w-4 h-4 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {group.type === "private" ? "Private" : "College"}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Members</span>
                      <span className="text-white font-semibold">{group.memberCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Avg XP</span>
                      <span className="text-white font-semibold">{group.averageXp}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

