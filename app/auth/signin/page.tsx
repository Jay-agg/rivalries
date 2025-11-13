"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { GridPattern } from "@/components/ui/grid-pattern"
import { PageLoader } from "@/components/ui/page-loader"
import Link from "next/link"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loader for 2 seconds when page loads
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <PageLoader key="loader" />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen w-full bg-black flex items-center justify-center p-6"
          >
            <GridPattern className="opacity-20" />
            
            <div className="absolute top-6 left-6 z-10">
              <Link href="/">
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Handjet', cursive" }}>
                  rivalries
                </h1>
              </Link>
            </div>

            <div className="relative z-10">
              <AuthForm mode="signin" />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}

