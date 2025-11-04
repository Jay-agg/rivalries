"use client"

import { motion } from "framer-motion"
import { Github, Code2, Trophy, Twitter, Calendar, BookOpen, GitBranch, Database } from "lucide-react"

const integrations = [
  { icon: Github, name: "GitHub", color: "text-white" },
  { icon: Code2, name: "LeetCode", color: "text-yellow-400" },
  { icon: Trophy, name: "Codeforces", color: "text-blue-400" },
  { icon: Twitter, name: "Twitter", color: "text-cyan-400" },
  { icon: Calendar, name: "HackerRank", color: "text-green-400" },
  { icon: BookOpen, name: "GeeksforGeeks", color: "text-emerald-400" },
  { icon: GitBranch, name: "GitLab", color: "text-orange-400" },
  { icon: Database, name: "CodeChef", color: "text-purple-400" },
]

export function Integrations() {
  return (
    <section className="relative py-24 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" >

            Track 
            <span className="text-purple-200 font-bold mx-4" style={{ fontFamily: "'Handjet', cursive" }}>
                Everything
            </span>
             at one place
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 via-orange-400 to-purple-300 mx-auto rounded-full" />
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {integrations.map((integration, index) => {
            const Icon = integration.icon
            return (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex flex-col items-center justify-center"
              >
                {/* Logo Container */}
                <div className="relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-110">
                    <Icon className={`w-8 h-8 ${integration.color} transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                </div>

                {/* Label - appears on hover */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-white/60 font-medium">
                    {integration.name}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-2xl md:text-3xl text-white/40 font-light">
            or anything else you need
          </p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

