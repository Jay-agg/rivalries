"use client"

import { motion } from "framer-motion"
import { forwardRef, useRef } from "react"
import { LampContainer } from "@/components/ui/lamp"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Marquee } from "@/components/ui/marquee"
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { Github, Code2, Trophy, Twitter, Target, TrendingUp, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-white/20 bg-black p-3 shadow-[0_0_20px_-12px_rgba(255,255,255,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})
Circle.displayName = "Circle"

const activities = [
  {
    name: "Problem Solved",
    description: "Solved 'Two Sum' on LeetCode",
    time: "2m ago",
    xp: "+50 XP",
  },
  {
    name: "GitHub Push",
    description: "Pushed to main branch",
    time: "10m ago",
    xp: "+30 XP",
  },
  {
    name: "Contest Win",
    description: "Placed #12 in Codeforces Div 2",
    time: "1h ago",
    xp: "+200 XP",
  },
  {
    name: "Streak Milestone",
    description: "Achieved 30-day coding streak",
    time: "2h ago",
    xp: "+500 XP",
  },
]

const stats = [
  { label: "Problems Solved", value: "127" },
  { label: "Commits This Week", value: "42" },
  { label: "Current Streak", value: "30 days" },
  { label: "Total XP", value: "15,420" },
]

const friends = [
  { name: "Alex Chen", xp: "15,420", rank: 1, avatar: "AC" },
  { name: "Sarah Park", xp: "14,890", rank: 2, avatar: "SP" },
  { name: "You", xp: "14,250", rank: 3, avatar: "YO", isYou: true },
  { name: "Mike Johnson", xp: "13,780", rank: 4, avatar: "MJ" },
  { name: "Emma Davis", xp: "12,950", rank: 5, avatar: "ED" },
]

function AnimatedBeamIntegration() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leetcodeRef = useRef<HTMLDivElement>(null)
  const codeforcesRef = useRef<HTMLDivElement>(null)
  const twitterRef = useRef<HTMLDivElement>(null)
  const githubRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-row items-center justify-between gap-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <Circle ref={leetcodeRef}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FFA116">
              <path d="M13.483 0v7.5H23l-9.517 16.5v-7.5H4z"/>
            </svg>
          </Circle>
          <Circle ref={codeforcesRef}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1F8ACB">
              <path d="M4.5 7.5A1.5 1.5 0 016 9v10.5A1.5 1.5 0 014.5 21h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5A1.5 1.5 0 0115 4.5v15a1.5 1.5 0 01-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5A1.5 1.5 0 0124 12v7.5a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h3z"/>
            </svg>
          </Circle>
        </div>

        <Circle ref={centerRef} className="size-16 border-white/30">
          <Zap className="w-8 h-8 text-white" />
        </Circle>

        <div className="flex flex-col items-center justify-center gap-6">
          <Circle ref={twitterRef}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1DA1F2">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </Circle>
          <Circle ref={githubRef}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#fff">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leetcodeRef}
        toRef={centerRef}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={codeforcesRef}
        toRef={centerRef}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={twitterRef}
        toRef={centerRef}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={githubRef}
        toRef={centerRef}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  )
}

const features = [
  {
    Icon: Github,
    name: "GitHub Integration",
    description: "Track every commit, push, and pull request. Your code contributions become XP automatically.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <PixelatedCanvas
          src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop"
          width={400}
          height={352}
          cellSize={4}
          dotScale={0.85}
          shape="square"
          backgroundColor="#000000"
          interactive={true}
          distortionMode="swirl"
          distortionStrength={6}
          distortionRadius={100}
          followSpeed={0.2}
          dropoutStrength={0.35}
          tintColor="#3b82f6"
          tintStrength={0.4}
          fadeOnLeave={true}
          jitterStrength={5}
          className="w-full h-full scale-110 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_20%,#000_80%,transparent_100%)]"
        />
      </div>
    ),
  },
  {
    Icon: Users,
    name: "Compete with Friends",
    description: "Challenge your friends. Compare progress. Race to the top of the leaderboard together.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-start justify-center px-12 py-16 pb-32">
        <div className="w-full max-w-md space-y-2.5">
          {friends.map((friend, idx) => (
            <motion.div
              key={friend.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 hover:scale-105",
                friend.isYou 
                  ? "bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/10" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold",
                friend.rank === 1 ? "bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500/50" :
                friend.rank === 2 ? "bg-gray-400/20 text-gray-300 border-2 border-gray-400/50" :
                friend.rank === 3 ? "bg-orange-500/20 text-orange-400 border-2 border-orange-500/50" :
                "bg-white/10 text-white/60"
              )}>
                {friend.avatar}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{friend.name}</div>
                <div className="text-xs text-white/60">{friend.xp} XP</div>
              </div>
              <div className={cn(
                "text-lg font-bold",
                friend.rank === 1 ? "text-yellow-400" :
                friend.rank === 2 ? "text-gray-300" :
                friend.rank === 3 ? "text-orange-400" :
                "text-white/40"
              )}>
                #{friend.rank}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Code2,
    name: "Multi-Platform Sync",
    description: "LeetCode, Codeforces, Twitter, and more—all synced in one place.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <AnimatedBeamIntegration />,
  },
  {
    Icon: Zap,
    name: "XP & Streak System",
    description: "Track your daily XP, maintain streaks, and watch your progress compound over time.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 flex items-start justify-center px-10 py-16 pb-32">
        <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-3.5 rounded-lg bg-white/5 border border-white/10"
            >
              <span className="text-xl font-bold text-white">{stat.value}</span>
              <span className="text-[10px] text-white/60 text-center mt-1 leading-tight">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Users,
    name: "College Leaderboards",
    description: "Compete with classmates. See rankings. Stay motivated through friendly competition.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-start justify-center px-10 py-16 pb-32">
        <div className="w-full max-w-[280px] space-y-2.5">
          {[1, 2, 3, 4, 5].map((rank) => (
            <motion.div
              key={rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rank * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                rank === 2 ? "bg-gray-400/20 text-gray-400" :
                rank === 3 ? "bg-orange-500/20 text-orange-400" :
                "bg-white/10 text-white/60"
              )}>
                {rank}
              </div>
              <div className="flex-1">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - rank * 15}%` }}
                    transition={{ delay: rank * 0.1 + 0.2, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Trophy,
    name: "Achievements & Badges",
    description: "Earn badges for milestones. Showcase your journey. Celebrate every win.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <PixelatedCanvas
          src="https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=600&h=400&fit=crop"
          width={400}
          height={352}
          cellSize={4}
          dotScale={0.85}
          shape="square"
          backgroundColor="#000000"
          interactive={true}
          distortionMode="attract"
          distortionStrength={10}
          distortionRadius={120}
          followSpeed={0.15}
          dropoutStrength={0.4}
          tintColor="#a855f7"
          tintStrength={0.5}
          fadeOnLeave={true}
          jitterStrength={4}
          className="w-full h-full scale-110 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_20%,#000_80%,transparent_100%)]"
        />
      </div>
    ),
  },
  {
    Icon: Target,
    name: "AI Goal Planning",
    description: "Set targets, get personalized roadmaps, and track progress toward your dream role.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <PixelatedCanvas
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop"
          width={400}
          height={352}
          cellSize={4}
          dotScale={0.85}
          shape="square"
          backgroundColor="#000000"
          interactive={true}
          distortionMode="swirl"
          distortionStrength={8}
          distortionRadius={100}
          followSpeed={0.18}
          dropoutStrength={0.3}
          tintColor="#f97316"
          tintStrength={0.45}
          fadeOnLeave={true}
          jitterStrength={6}
          className="w-full h-full scale-110 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_20%,#000_80%,transparent_100%)]"
        />
      </div>
    ),
  },
]

export function Features() {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* Lamp Effect */}
      <LampContainer>
        <motion.h2
          className="text-5xl md:text-7xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Everything You Need
        </motion.h2>
        <motion.p
          className="text-xl text-white/60 max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Built for developers who want to level up. Track, compete, and stay consistent.
        </motion.p>
      </LampContainer>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-32 -mt-96 relative z-50">
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
