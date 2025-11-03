"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GridPattern } from "@/components/ui/grid-pattern"

export function CTA() {
  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      <GridPattern className="opacity-20" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white leading-tight" style={{ fontFamily: "'Handjet', cursive" }}>
            your biggest competition?
            <br />
            <span className="text-white/60">it&apos;s you.</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Stop comparing yourself to others. Start competing with your past self.
            Track your growth. Stay consistent. Build the developer you want to become.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
        >
          <Link href="/auth/signup">
            <Button 
              size="lg" 
              className="text-xl px-12 py-8 rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-105"
              style={{ fontFamily: "'Handjet', cursive", fontWeight: 600 }}
            >
              start your journey
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-white/40 pt-8"
        >
          Free to start. No credit card required.
        </motion.p>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  )
}

