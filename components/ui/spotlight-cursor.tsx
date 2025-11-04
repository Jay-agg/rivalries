"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface SpotlightCursorProps {
  className?: string
}

export function SpotlightCursor({ className }: SpotlightCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setMousePosition({ x, y })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", () => setIsHovering(true))
      container.addEventListener("mouseleave", () => setIsHovering(false))
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", () => setIsHovering(true))
        container.removeEventListener("mouseleave", () => setIsHovering(false))
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {/* Subtle overall brightness on hover */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Cursor spotlight effect */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 30%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(20px)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  )
}

