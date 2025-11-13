"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Check, Link2, Users, TrendingUp, Zap, Trophy } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Connect Your Accounts",
    description: "Link your GitHub, LeetCode, Codeforces, and Twitter accounts in one click. We sync your data to track your coding activity.",
    details: [
      "OAuth authentication for security",
      "One-time setup takes 2 minutes",
      "Automatic daily syncing",
      "Data privacy guaranteed"
    ],
    icon: Link2,
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    title: "Join Your Community",
    description: "Find your college leaderboard or create private groups with friends. Compete, collaborate, and stay accountable together.",
    details: [
      "Join your college leaderboard",
      "Create private friend groups",
      "Real-time rankings",
      "Challenge friends directly"
    ],
    icon: Users,
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    title: "Track Your Progress",
    description: "Every commit, problem solved, and contest entered earns you XP. Build streaks and watch your consistency compound over time.",
    details: [
      "Earn XP for every activity",
      "Maintain daily streaks",
      "Unlock achievements",
      "View detailed analytics"
    ],
    icon: TrendingUp,
    color: "from-orange-500 to-yellow-500"
  },
  {
    number: "04",
    title: "Level Up & Compete",
    description: "Climb the leaderboards, earn badges, and compete with friends. Turn your coding journey into an exciting game.",
    details: [
      "Compete on leaderboards",
      "Earn exclusive badges",
      "Set and achieve goals",
      "Share your achievements"
    ],
    icon: Trophy,
    color: "from-green-500 to-emerald-500"
  }
]

function StepTexture({ color, isActive }: { color: string; isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [radius, setRadius] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let noiseCanvas: HTMLCanvasElement | null = null

    const generateNoiseTexture = () => {
      const width = canvas.width
      const height = canvas.height

      noiseCanvas = document.createElement("canvas")
      noiseCanvas.width = width
      noiseCanvas.height = height
      const noiseCtx = noiseCanvas.getContext("2d")
      if (!noiseCtx) return

      const imageData = noiseCtx.createImageData(width, height)
      const data = imageData.data

      // Parse color from gradient string
      const colorMap: { [key: string]: [number, number, number] } = {
        "from-blue-500 to-cyan-500": [59, 130, 246],
        "from-purple-500 to-pink-500": [168, 85, 247],
        "from-orange-500 to-yellow-500": [249, 115, 22],
        "from-green-500 to-emerald-500": [34, 197, 94],
      }

      const baseColor = colorMap[color] || [59, 130, 246]

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random()
        data[i] = baseColor[0] * noise
        data[i + 1] = baseColor[1] * noise
        data[i + 2] = baseColor[2] * noise
        data[i + 3] = 255 * noise * 0.5
      }

      noiseCtx.putImageData(imageData, 0, 0)
    }

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      generateNoiseTexture()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animate radius expanding
    let animationFrameId: number
    const maxRadius = Math.sqrt(canvas.width ** 2 + canvas.height ** 2)
    let currentRadius = 0
    const duration = 800 // milliseconds
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)
      currentRadius = Math.max(1, eased * maxRadius) // Ensure radius is at least 1

      if (!noiseCanvas || canvas.width === 0 || canvas.height === 0) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw noise texture
      ctx.drawImage(noiseCanvas, 0, 0)

      // Apply radial mask
      ctx.globalCompositeOperation = "destination-in"
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, currentRadius
      )
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = "source-over"

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isActive, color])

  if (!isActive) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "lighten", opacity: 0.8 }}
      />
    </div>
  )
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  // Auto-advance timer (5 seconds per step)
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, 5000)

    return () => clearTimeout(timer)
  }, [activeStep])

  // Progress bar animation
  useEffect(() => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100))
    }, 100)

    return () => clearInterval(interval)
  }, [activeStep])

  return (
    <section className="relative py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            How It Works
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Four simple steps to transform your coding journey
          </p>
        </motion.div>

        {/* Grid Layout - Boxy with extended borders */}
        <div className="relative overflow-visible">
          {/* Extended border lines on outer edges */}
          <div className="absolute -top-4 inset-x-0 h-4 border-l-2 border-r-2 border-white/30 pointer-events-none z-10" />
          <div className="absolute -bottom-4 inset-x-0 h-4 border-l-2 border-r-2 border-white/30 pointer-events-none z-10" />
          <div className="absolute inset-y-0 -left-4 w-4 border-t-2 border-b-2 border-white/30 pointer-events-none z-10" />
          <div className="absolute inset-y-0 -right-4 w-4 border-t-2 border-b-2 border-white/30 pointer-events-none z-10" />
          
          <div className="flex flex-col lg:flex-row border border-white/10">
            {/* Left Side - Steps List */}
            <div className="flex flex-col border-r border-white/10 lg:w-1/2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index
              const isPast = index < activeStep

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "relative p-5 cursor-pointer transition-colors duration-300 overflow-hidden border-b border-white/10 last:border-b-0 flex-1",
                    isActive
                      ? "bg-white/10 hover:bg-white/[0.12]"
                      : "bg-black hover:bg-white/5"
                  )}
                >
                  {/* Texture Effect */}
                  <StepTexture color={step.color} isActive={isActive} />

                  <div className="flex items-center gap-4 relative z-10 h-full">
                    {/* Icon/Check */}
                    <div className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                      isPast
                        ? "bg-green-500/20 border-2 border-green-500/50"
                        : isActive
                        ? `bg-gradient-to-br ${step.color}`
                        : "bg-white/5 border-2 border-white/20"
                    )}>
                      {isPast ? (
                        <Check className="w-6 h-6 text-green-400" />
                      ) : (
                        <Icon className={cn(
                          "w-6 h-6",
                          isActive ? "text-white" : "text-white/60"
                        )} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-mono",
                          isActive ? "text-white" : "text-white/40"
                        )}>
                          {step.number}
                        </span>
                        <h3 className={cn(
                          "text-xl font-semibold",
                          isActive ? "text-white" : "text-white/70"
                        )}>
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
            </div>

            {/* Right Side - Active Step Details */}
            <div className="lg:w-1/2 flex items-stretch">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-8 bg-black hover:bg-white/5 transition-all duration-300 overflow-hidden w-full flex flex-col justify-center"
                >
                {/* Timer Circle - Top Right */}
                <div className="absolute top-6 right-6 z-20">
                  <svg className="w-12 h-12 -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="url(#progressGradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-100"
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white/60">
                    {steps[activeStep].number}
                  </span>
                </div>

                {/* Gradient background effect */}
                <div className={cn(
                  "absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-20 blur-3xl",
                  steps[activeStep].color
                )} />

                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className={cn(
                    "w-16 h-16 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-lg",
                    steps[activeStep].color
                  )}>
                    {(() => {
                      const Icon = steps[activeStep].icon
                      return <Icon className="w-8 h-8 text-white" />
                    })()}
                  </div>

                  {/* Title */}
                  <div>
                    {/* <p className="text-sm text-white/40 font-mono mb-2">
                      Step {steps[activeStep].number}
                    </p> */}
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-lg text-white/70 leading-relaxed">
                      {steps[activeStep].description}
                    </p>
                  </div>

                  {/* Details List */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {steps[activeStep].details.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        <p className="text-white/80">{detail}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Step indicator dots */}
                  {/* <div className="flex gap-2 pt-6">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={cn(
                          "h-2 rounded-full transition-all",
                          idx === activeStep
                            ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                            : "w-2 bg-white/20 hover:bg-white/30"
                        )}
                      />
                    ))}
                  </div> */}
                </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
