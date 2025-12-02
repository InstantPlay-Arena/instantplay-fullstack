import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "InstantPlay Auth",
  description: "Authentication system for InstantPlay",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
