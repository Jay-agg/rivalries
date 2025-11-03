"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Connect",
    description: "Link your GitHub, LeetCode, and Codeforces accounts. Takes 2 minutes.",
  },
  {
    number: "02",
    title: "Compete",
    description: "Join your college leaderboard or create private groups with friends.",
  },
  {
    number: "03",
    title: "Grow",
    description: "Track daily XP, maintain streaks, and watch your consistency compound.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Handjet', cursive" }}>
            how it works
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Three simple steps to start your journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent -translate-y-1/2 z-0" />
              )}

              <Card className="relative z-10 border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm hover:from-white/10 transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="text-6xl font-bold text-white/20" style={{ fontFamily: "'Handjet', cursive" }}>
                    {step.number}
                  </div>
                  <h3 className="text-3xl font-bold text-white" style={{ fontFamily: "'Handjet', cursive" }}>
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

