"use client"

import { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href?: string
  cta?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div className="relative overflow-visible">
      {/* Extended border lines on outer edges only - brighter for visibility */}
      <div className="absolute -top-4 inset-x-0 h-4 border-l-2 border-r-2 border-white/30 pointer-events-none z-10" />
      <div className="absolute -bottom-4 inset-x-0 h-4 border-l-2 border-r-2 border-white/30 pointer-events-none z-10" />
      <div className="absolute inset-y-0 -left-4 w-4 border-t-2 border-b-2 border-white/30 pointer-events-none z-10" />
      <div className="absolute inset-y-0 -right-4 w-4 border-t-2 border-b-2 border-white/30 pointer-events-none z-10" />
      
      <div
        className={cn(
          "grid w-full auto-rows-[22rem] grid-cols-3 gap-0 border border-white/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => {
  const IconComponent = Icon as React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden",
        // dark styles - ultra boxy with sharp edges
        "bg-black transform-gpu border border-white/10 transition-all duration-300",
        "hover:border-white/30 hover:bg-white/5",
        className
      )}
      {...props}
    >
      <div>{background}</div>
      
      {/* Backdrop for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none" />
      
      <div className="relative p-6 z-10">
        <div className="pointer-events-none flex transform-gpu flex-col gap-1 transition-all duration-300 group-hover:-translate-y-2">
          <IconComponent className="h-12 w-12 text-neutral-300 transition-colors duration-300 group-hover:text-white" aria-hidden={true} />
          <h3 className="text-xl font-semibold text-white">
            {name}
          </h3>
          <p className="max-w-lg text-neutral-300">{description}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/5" />
    </div>
  )
}

export { BentoCard, BentoGrid }
