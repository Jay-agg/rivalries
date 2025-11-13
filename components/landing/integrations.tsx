"use client"

import { motion } from "framer-motion"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { MorphingText } from "@/components/ui/morphing-text"

export function Integrations() {
  return (
    <section className="relative py-32 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Main Content Box */}
        <div className="relative">
          {/* Boxy Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-12 md:p-16 bg-white/5 border border-white/10 rounded-sm overflow-hidden"
          >
            
            {/* Flickering Grid Background - Only behind card */}
            <div className="absolute inset-0 z-0">
              <FlickeringGrid
                className="w-full h-full"
                squareSize={6}
                gridGap={8}
                color="rgb(168, 85, 247)"
                maxOpacity={0.15}
                flickerChance={0.1}
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 space-y-8 text-center">
              
              {/* Small Label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-sm uppercase tracking-wider text-white/40 font-semibold">
                  What is Rivalries?
                </span>
              </motion.div>

              {/* Main Explanation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  A platform that tracks{" "}
                  <span className="text-purple-300" style={{ fontFamily: "'Handjet', cursive" }}>
                    everything
                  </span>
                  {" "}you do
                </h2>
                
                {/* Morphing Text */}
                <div className="my-8 mb-10">
                  <MorphingText
                    texts={[
                      "GitHub commits",
                      "LeetCode problems",
                      "Codeforces contests",
                      "Custom goals"
                    ]}
                    className="h-12 md:h-16 text-xl md:text-2xl text-orange-700/70"
                    
                  />
                </div>

                <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mt-4">
                  All your progress, unified into one score: <span className="text-white font-semibold">XP</span>.
                </p>
              </motion.div>

              {/* Divider */}
              <div className="h-px w-24 bg-white/20 mx-auto" />

              {/* Secondary Explanation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  Build streaks. Compete on leaderboards with friends and your college. 
                  Watch your ranking climb as you stay consistent.
                </p>
                
                <p className="text-2xl md:text-3xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
                  But here&apos;s the truth
                  <br />
                  <span className="italic text-purple-200" style={{ fontFamily: "'Handjet', cursive" }}>
                    your biggest rival is yourself.
                  </span>
                </p>
              </motion.div>

              {/* Bottom Statement */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="pt-8"
              >
                <p className="text-lg text-white/50">
                  Every day is a chance to beat yesterday&apos;s version of you.
                </p>
              </motion.div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-16 bg-gradient-to-b from-purple-400 to-transparent" />
            <div className="absolute top-0 right-0 w-2 h-16 bg-gradient-to-b from-yellow-400 to-transparent" />
            <div className="absolute bottom-0 left-0 w-2 h-16 bg-gradient-to-t from-orange-400 to-transparent" />
            <div className="absolute bottom-0 right-0 w-2 h-16 bg-gradient-to-t from-pink-400 to-transparent" />
            
            {/* Top Edge Accent */}
            <div className="absolute top-0 left-20 right-20 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        </div>

      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

