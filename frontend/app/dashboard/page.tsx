"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <p className="text-white text-lg">Chargement...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-5xl text-center mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Bienvenue au Dashboard !
          </h1>
          <p className="text-slate-600 mb-6">
            Vous êtes maintenant connecté. Votre JWT est stocké dans localStorage
            et prêt à être utilisé pour les appels API authentifiés.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
            <h2 className="font-semibold text-blue-900 mb-2">
              ✓ Authentification réussie
            </h2>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Inscription/Connexion implémentée</li>
              <li>✓ Validation côté client (Zod)</li>
              <li>✓ Gestion JWT (localStorage)</li>
              <li>✓ Redirection après login</li>
              <li>✓ shadcn/ui intégré</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900">Prochaines étapes :</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Connecter à votre backend API</li>
              <li>Ajouter une protection des routes (middleware)</li>
              <li>Gérer le refresh du token JWT</li>
              <li>Ajouter les erreurs de validation du backend</li>
            </ul>
          </div>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="mt-8 w-full"
          >
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  )
}
