"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface PageLoaderProps {
  onComplete?: () => void
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [currentLetter, setCurrentLetter] = useState(0)
  const letters = "rivalries".split("")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLetter((prev) => (prev + 1) % letters.length)
    }, 200) // Each letter jumps every 200ms

    return () => clearInterval(interval)
  }, [letters.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="flex items-center justify-center">
        <div className="flex gap-1" style={{ fontFamily: "'Handjet', cursive" }}>
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-6xl md:text-8xl font-bold text-white"
              animate={{
                y: currentLetter === index ? [0, -20, 0] : 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

