"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedBeamProps {
  className?: string
  duration?: number
  delay?: number
  pathColor?: string
  gradientStartColor?: string
  gradientStopColor?: string
  from: { x: number; y: number }
  to: { x: number; y: number }
}

export function AnimatedBeam({
  className,
  duration = 3,
  delay = 0,
  pathColor = "rgba(255, 255, 255, 0.1)",
  gradientStartColor = "#3b82f6",
  gradientStopColor = "#8b5cf6",
  from,
  to,
}: AnimatedBeamProps) {
  const id = useRef(`beam-${Math.random()}`)

  return (
    <svg
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>
        <linearGradient id={id.current} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Static path */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={pathColor}
        strokeWidth="2"
      />

      {/* Animated beam */}
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={from.x}
        y2={from.y}
        stroke={`url(#${id.current})`}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{
          x1: from.x,
          y1: from.y,
          x2: from.x,
          y2: from.y,
        }}
        animate={{
          x1: [from.x, to.x, to.x],
          y1: [from.y, to.y, to.y],
          x2: [from.x, from.x, to.x],
          y2: [from.y, from.y, to.y],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          delay: delay,
          ease: "linear",
        }}
      />
    </svg>
  )
}

