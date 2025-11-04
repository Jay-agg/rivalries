"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CursorReveal } from "@/components/ui/cursor-reveal"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Cursor Reveal Effect - Full screen tracking */}
      <CursorReveal className="absolute inset-0 z-0" />

      {/* Background Image */}
      <div className="absolute inset-0 z-0 m-24 pointer-events-none">
        <div className="relative h-full w-full rounded-2xl outline outline-gray-500 overflow-hidden">
          <div className="absolute inset-0 rounded-2xl">
            <Image
              src="/rivalhero.jpg"
              alt="Background"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        </div>
      </div>

      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto mx-6 my-32 text-center pointer-events-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >

          <h1 className="text-7xl font-bold md:text-3xl lg:text-5xl font-italic tracking-tight text-white">
          Compete. Improve. Repeat. 
          </h1>
          <h1 className="text-5xl text-purple-200 md:text-3xl lg:text-5xl font-italic tracking-tight" style={{ fontFamily: "'Handjet', cursive" }}>
          
          </h1>

          <div className="flex flex-row items-center justify-center">
          <p className="text-2xl md:text-3xl text-white/60 font-light max-w-2xl mr-2">
          Turn your progress into a 
          </p>
          <p  className="text-2xl text-purple-200 md:text-3xl lg:text-3xl font-italic tracking-tight" style={{ fontFamily: "'Handjet', cursive" }}>
          rivalry
          </p>  

          </div>
          


          {/* <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Track your coding journey. Compete with friends. 
            Stay consistent. Turn your progress into XP and climb the leaderboards.
          </p> */}


          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="text-lg px-8 py-3 rounded-sm bg-white text-black hover:bg-white/90 transition-all hover:scale-105 font-semibold cursor-pointer"
              >
                Arena <ArrowRight />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg  px-8 py-3 rounded-sm  border-2 bg-black hover:bg-black/80 transition-all hover:scale-105 cursor-pointer"
              >
                Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </motion.div> */}
    </section>
  )
}

