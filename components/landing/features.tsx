"use client"

import { motion } from "framer-motion"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Activity, Users, Target, Zap, Trophy, GitBranch, Github, Code2, TrendingUp, Twitter } from "lucide-react"
import { useRef, useEffect, useState } from "react"

export function Features() {
  const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const githubRef = useRef<HTMLDivElement>(null)
  const leetcodeRef = useRef<HTMLDivElement>(null)
  const codeforcesRef = useRef<HTMLDivElement>(null)
  const twitterRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const refs = {
        github: githubRef.current,
        leetcode: leetcodeRef.current,
        codeforces: codeforcesRef.current,
        twitter: twitterRef.current,
        center: centerRef.current,
      }

      const newPositions: typeof positions = {}

      Object.entries(refs).forEach(([key, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          newPositions[key] = {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          }
        }
      })

      setPositions(newPositions)
    }

    updatePositions()
    window.addEventListener("resize", updatePositions)
    return () => window.removeEventListener("resize", updatePositions)
  }, [])

  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Everything You Need
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Built for developers who want to level up. Track, compete, and stay consistent.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Animated Beams */}
          {positions.github && positions.center && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="beam-github" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="beam-leetcode" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                  <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="beam-codeforces" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="beam-twitter" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Static lines */}
              <line
                x1={positions.github.x}
                y1={positions.github.y}
                x2={positions.center.x}
                y2={positions.center.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <line
                x1={positions.leetcode.x}
                y1={positions.leetcode.y}
                x2={positions.center.x}
                y2={positions.center.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <line
                x1={positions.codeforces.x}
                y1={positions.codeforces.y}
                x2={positions.center.x}
                y2={positions.center.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <line
                x1={positions.twitter.x}
                y1={positions.twitter.y}
                x2={positions.center.x}
                y2={positions.center.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />

              {/* Animated beams */}
              <motion.line
                x1={positions.github.x}
                y1={positions.github.y}
                x2={positions.github.x}
                y2={positions.github.y}
                stroke="url(#beam-github)"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: [positions.github.x, positions.center.x],
                  y2: [positions.github.y, positions.center.y],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0,
                }}
              />
              <motion.line
                x1={positions.leetcode.x}
                y1={positions.leetcode.y}
                x2={positions.leetcode.x}
                y2={positions.leetcode.y}
                stroke="url(#beam-leetcode)"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: [positions.leetcode.x, positions.center.x],
                  y2: [positions.leetcode.y, positions.center.y],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
              />
              <motion.line
                x1={positions.codeforces.x}
                y1={positions.codeforces.y}
                x2={positions.codeforces.x}
                y2={positions.codeforces.y}
                stroke="url(#beam-codeforces)"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: [positions.codeforces.x, positions.center.x],
                  y2: [positions.codeforces.y, positions.center.y],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1,
                }}
              />
              <motion.line
                x1={positions.twitter.x}
                y1={positions.twitter.y}
                x2={positions.twitter.x}
                y2={positions.twitter.y}
                stroke="url(#beam-twitter)"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: [positions.twitter.x, positions.center.x],
                  y2: [positions.twitter.y, positions.center.y],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5,
                }}
              />
            </svg>
          )}

          <BentoGrid className="relative z-10">
            {/* GitHub Integration */}
            <BentoGridItem
              title="GitHub Integration"
              description="Track every commit, push, and pull request. Your code contributions become XP automatically."
              header={
                <div ref={githubRef} className="flex items-center justify-center h-24">
                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                    <Github className="w-12 h-12 text-blue-400" />
                  </div>
                </div>
              }
              className="md:col-span-1 bg-black/50 border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all"
            />

            {/* LeetCode Sync */}
            <BentoGridItem
              title="LeetCode Progress"
              description="Every problem solved counts. Easy, medium, or hard—earn XP and build your problem-solving streak."
              header={
                <div ref={leetcodeRef} className="flex items-center justify-center h-24">
                  <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                    <Code2 className="w-12 h-12 text-yellow-400" />
                  </div>
                </div>
              }
              className="md:col-span-1 bg-black/50 border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all"
            />

            {/* Codeforces */}
            <BentoGridItem
              title="Codeforces Contests"
              description="Participate in contests, climb the ratings, and showcase your competitive programming skills."
              header={
                <div ref={codeforcesRef} className="flex items-center justify-center h-24">
                  <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                    <Trophy className="w-12 h-12 text-purple-400" />
                  </div>
                </div>
              }
              className="md:col-span-1 bg-black/50 border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all"
            />

            {/* Center - Rivalries Hub */}
            <BentoGridItem
              title={<div ref={centerRef}>Rivalries Hub</div>}
              description="All your coding activity synced in one place. Track XP, maintain streaks, and compete with friends on unified leaderboards."
              header={
                <div className="flex items-center justify-center h-32 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl blur-xl" />
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-sm">
                    <Zap className="w-16 h-16 text-white" />
                  </div>
                </div>
              }
              className="md:col-span-2 md:row-span-2 bg-black/50 border-white/20 backdrop-blur-sm hover:bg-white/5 transition-all"
            />

            {/* Twitter Updates */}
            <BentoGridItem
              title="Twitter Integration"
              description="Share your learning journey. Post about your progress and earn XP for staying consistent and vocal."
              header={
                <div ref={twitterRef} className="flex items-center justify-center h-24">
                  <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    <Twitter className="w-12 h-12 text-cyan-400" />
                  </div>
                </div>
              }
              className="md:col-span-1 bg-black/50 border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all"
            />

            {/* Daily XP System */}
            <BentoGridItem
              title="Daily XP System"
              description="Every action translates to points. Build streaks, earn badges, and watch your consistency compound over time."
              header={
                <div className="flex items-center justify-center h-24">
                  <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                    <TrendingUp className="w-12 h-12 text-green-400" />
                  </div>
                </div>
              }
              className="md:col-span-1 bg-black/50 border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all"
            />

            {/* Leaderboards */}
            <BentoGridItem
              title="College Leaderboards"
              description="Compete with your classmates. See how you rank. Stay motivated through friendly competition and accountability."
              header={
                <div className="flex items-center justify-center h-24">
                  <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20">
                    <Users className="w-12 h-12 text-pink-400" />
                  </div>
                </div>
              }
              className="md:col-span-1 bg-black/50 border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all"
            />

            {/* Goal Planning */}
            <BentoGridItem
              title="AI Goal Planning"
              description="Set targets, get personalized roadmaps, and track daily progress toward your dream role or skill milestone."
              header={
                <div className="flex items-center justify-center h-24">
                  <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                    <Target className="w-12 h-12 text-orange-400" />
                  </div>
                </div>
              }
              className="md:col-span-1 bg-black/50 border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all"
            />
          </BentoGrid>
        </div>
      </div>
    </section>
  )
}

