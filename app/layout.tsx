import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rivalries - Maybe You're Your Own Rival",
  description: "Track your coding journey. Compete with friends. Stay consistent. Turn your progress into XP and climb the leaderboards.",
  keywords: ["coding", "leaderboard", "leetcode", "github", "codeforces", "productivity", "accountability"],
  openGraph: {
    title: "Rivalries - Maybe You're Your Own Rival",
    description: "Track your coding journey. Compete with friends. Stay consistent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
