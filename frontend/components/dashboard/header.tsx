"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"

interface DashboardHeaderProps {
  userName?: string
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transform text-lg">
              🎮
            </div>
            <span className="font-bold text-lg text-slate-900 hidden sm:inline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InstantPlay
            </span>
          </Link>

          {/* User Info */}
          <div className="flex items-center gap-4">
            {userName && (
              <div className="hidden md:flex flex-col items-end">
                <p className="text-sm font-medium text-slate-900">
                  Bienvenue
                </p>
                <p className="text-xs text-slate-600">{userName}</p>
              </div>
            )}

            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-slate-300 hover:border-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
