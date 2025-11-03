import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function calculateXP(activity: {
  githubCommits?: number
  leetcodeSolved?: number
  codeforcesParticipation?: number
  tweets?: number
  customTasks?: number
}): number {
  const {
    githubCommits = 0,
    leetcodeSolved = 0,
    codeforcesParticipation = 0,
    tweets = 0,
    customTasks = 0,
  } = activity

  return (
    githubCommits * 3 +
    leetcodeSolved * 5 +
    codeforcesParticipation * 20 +
    tweets * 2 +
    customTasks * 10
  )
}

