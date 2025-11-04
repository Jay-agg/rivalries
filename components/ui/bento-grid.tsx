"use client"

import { ComponentPropsWithoutRef, ReactNode } from "react"
import { ArrowRightIcon } from "lucide-react"
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
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
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
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // dark styles
        "bg-black transform-gpu [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)]",
        className
      )}
      {...props}
    >
      <div>{background}</div>
      
      {/* Backdrop for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none" />
      
      <div className="relative p-6 z-10">
        <div className="pointer-events-none flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <IconComponent className="h-12 w-12 origin-left transform-gpu text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75" aria-hidden={true} />
        <h3 className="text-xl font-semibold text-white">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-300">{description}</p>
      </div>

      {cta && href && (
        <>
          <div
            className={cn(
              "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
            )}
          >
            <button
              className="pointer-events-auto text-sm text-white/60 hover:text-white flex items-center gap-2 transition-colors"
            >
              {cta}
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
            )}
          >
            <button
              className="pointer-events-auto text-sm text-white/60 hover:text-white flex items-center gap-2 transition-colors"
            >
              {cta}
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-neutral-800/10" />
    </div>
  )
}

export { BentoCard, BentoGrid }
