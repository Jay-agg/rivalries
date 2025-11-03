"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Image - You'll replace this with your actual image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        {/* Replace /hero-bg.png with your actual background image path */}
        <Image
          src="/hero-bg.png"
          alt="Background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white">
            rivalries
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-white/60 font-light max-w-2xl mx-auto">
            maybe you&apos;re your own rival
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Track your coding journey. Compete with friends. 
            Stay consistent. Turn your progress into XP and climb the leaderboards.
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="text-lg px-12 py-7 rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-105 font-semibold"
              >
                ready to face yourself?
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-12 py-7 rounded-full border-2 border-white/20 hover:bg-white/10 transition-all hover:scale-105"
              >
                explore demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}

