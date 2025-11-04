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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
