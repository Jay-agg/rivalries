import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateXP(activity: {
  githubCommits?: number
  leetcodeSolved?: number
  codeforcesParticipation?: number
  tweets?: number
  customTasks?: number
}) {
  const githubXP = (activity.githubCommits || 0) * 3
  const leetcodeXP = (activity.leetcodeSolved || 0) * 5
  const codeforcesXP = (activity.codeforcesParticipation || 0) * 20
  const twitterXP = (activity.tweets || 0) * 2
  const customXP = (activity.customTasks || 0) * 10

  return githubXP + leetcodeXP + codeforcesXP + twitterXP + customXP
}
