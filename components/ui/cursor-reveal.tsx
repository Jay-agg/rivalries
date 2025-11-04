"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface CursorRevealProps {
  className?: string
}

export function CursorReveal({ className }: CursorRevealProps) {
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [isInImageArea, setIsInImageArea] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let lastUpdateTime = 0
    const throttleMs = 16 // ~60fps max
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastUpdateTime < throttleMs) return
      lastUpdateTime = now
      
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      // Account for the m-24 (96px) margin
      const margin = 96 // 24 * 4 (Tailwind m-24)
      const x = e.clientX - rect.left - margin
      const y = e.clientY - rect.top - margin
      
      // Use ref to avoid triggering re-renders on every mouse move
      mousePositionRef.current = { x, y }
      
      // Check if mouse is over the image area (but don't turn off effect)
      const imageWidth = rect.width - (margin * 2)
      const imageHeight = rect.height - (margin * 2)
      const isInside = x >= 0 && x <= imageWidth && y >= 0 && y <= imageHeight
      setIsInImageArea(isInside)
    }

    const handleMouseEnter = () => {
      // Start tracking immediately when entering section
    }

    const handleMouseLeave = () => {
      setIsInImageArea(false)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create noise texture once and cache it
    let noiseCanvas: HTMLCanvasElement | null = null
    let animationFrameId: number

    const generateNoiseTexture = () => {
      const width = canvas.width
      const height = canvas.height
      
      // Create offscreen canvas for noise texture
      noiseCanvas = document.createElement('canvas')
      noiseCanvas.width = width
      noiseCanvas.height = height
      const noiseCtx = noiseCanvas.getContext('2d')
      if (!noiseCtx) return

      const imageData = noiseCtx.createImageData(width, height)
      const data = imageData.data
      
      // Generate grainy noise texture with colors
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random()
        const colorChoice = Math.random()
        let r, g, b
        
        if (colorChoice < 0.33) {
          r = 59 * noise
          g = 130 * noise
          b = 246 * noise
        } else if (colorChoice < 0.66) {
          r = 139 * noise
          g = 92 * noise
          b = 246 * noise
        } else {
          r = 6 * noise
          g = 182 * noise
          b = 212 * noise
        }
        
        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
        data[i + 3] = 255 * noise * 0.6
      }
      
      noiseCtx.putImageData(imageData, 0, 0)
    }

    const resizeCanvas = () => {
      // Reduce canvas resolution for better performance (0.5x scale)
      canvas.width = canvas.offsetWidth * 0.5
      canvas.height = canvas.offsetHeight * 0.5
      generateNoiseTexture()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const revealRadius = 150 // Reduced from 300

    let lastFrameTime = 0
    const targetFps = 30 // Limit to 30 FPS for performance
    const frameInterval = 1000 / targetFps

    const animate = (currentTime: number) => {
      // Throttle animation to target FPS
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!isInImageArea || !noiseCanvas) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      // Draw the cached noise texture
      ctx.drawImage(noiseCanvas, 0, 0)

      // Apply the circular mask (adjusted for 0.5x canvas scale)
      ctx.globalCompositeOperation = 'destination-in'
      
      const gradient = ctx.createRadialGradient(
        mousePositionRef.current.x * 0.5, mousePositionRef.current.y * 0.5, 0,
        mousePositionRef.current.x * 0.5, mousePositionRef.current.y * 0.5, revealRadius * 0.5
      )
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)')
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.globalCompositeOperation = 'source-over'

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isInImageArea])

  return (
    <div ref={containerRef} className={className}>
      {/* Effect only renders in the image area (m-24 with rounded border) */}
      <div className="absolute inset-0 m-24 pointer-events-none overflow-hidden rounded-2xl">
        {/* Subtle overall brightness on hover */}
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInImageArea ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Canvas for grainy texture effect */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: "lighten", opacity: 0.9 }}
        />
      </div>
    </div>
  )
}

