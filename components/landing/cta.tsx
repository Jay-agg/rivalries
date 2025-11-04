"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CursorReveal } from "@/components/ui/cursor-reveal"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Cursor Reveal Effect */}
      <CursorReveal className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              is this the{" "}
              <span className="italic font-black" style={{ fontFamily: "'Handjet', cursive" }}>
                life
              </span>
              <p>
                 you really want?
              </p>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-4"
            >
              <Link href="/auth/signup">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-3 rounded-sm bg-white text-black hover:bg-white/90 transition-all hover:scale-105 font-semibold"
                >
                  Arena <ArrowRight />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Image with Effects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[600px] pointer-events-none"
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              {/* Image */}
              <Image
                src="/footermotivation2.jpg"
                alt="Join the arena"
                fill
                className="object-cover opacity-60"
              />
              
              {/* Radial blur overlay - all sides */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black" 
                style={{
                  background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 70%, black 100%)'
                }}
              />
              
              {/* Top blur */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
              
              {/* Bottom blur */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
              
              {/* Left blur */}
              <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
              
              {/* Right blur */}
              <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />

              {/* Grainy texture overlay */}
              <div className="absolute inset-0 pointer-events-auto">
                <CursorReveal className="opacity-50" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  )
}

