import { AuthForm } from "@/components/auth/auth-form"
import { GridPattern } from "@/components/ui/grid-pattern"
import Link from "next/link"

export default function SignInPage() {
  return (
    <main className="relative min-h-screen w-full bg-black flex items-center justify-center p-6">
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
    </main>
  )
}

