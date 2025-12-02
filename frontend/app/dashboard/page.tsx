"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/lib/auth"
import { fetchGames, type Game } from "@/lib/games"
import { DashboardHeader } from "@/components/dashboard/header"
import { GameCard } from "@/components/dashboard/game-card"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const [gamesLoading, setGamesLoading] = useState(true)
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    const token = getToken()
    if (token) {
      setIsAuthenticated(true)
      setUserName("Joueur 🎮")
    } else {
      setIsAuthenticated(false)
      setUserName("Visiteur")
    }
  }, [])

  // Charger les jeux
  useEffect(() => {
    const loadGames = async () => {
      try {
        setGamesLoading(true)
        const gamesList = await fetchGames()
        setGames(gamesList)
      } catch (error) {
        console.error("Erreur lors du chargement des jeux:", error)
      } finally {
        setGamesLoading(false)
      }
    }

    loadGames()
  }, [])

  const handlePlayGame = (gameId: string) => {
    const game = games.find((g) => g.id === gameId)
    if (game) {
      if (!isAuthenticated) {
        alert(`Veuillez vous connecter pour jouer à ${game.name}`)
        router.push("/login")
        return
      }
      alert(`Démarrage de ${game.name}...`)
      // Redirection vers la page du jeu
      // router.push(`/game/${gameId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <DashboardHeader userName={isAuthenticated ? userName : undefined} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {isAuthenticated ? `Bienvenue, ${userName} ! 👋` : "Nos jeux populaires 🎮"}
          </h1>
          <p className="text-lg text-slate-600">
            {isAuthenticated
              ? "Choisissez un jeu et commencez à jouer immédiatement"
              : "Découvrez nos jeux. Connectez-vous pour jouer !"}
          </p>
        </div>

        {/* Games Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Jeux disponibles
            </h2>
            <span className="text-sm font-medium text-slate-600 bg-blue-50 px-3 py-1 rounded-full">
              {games.length} jeux
            </span>
          </div>

          {gamesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-slate-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={handlePlayGame}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-slate-600 mb-1">Jeux actifs</p>
              <p className="text-2xl font-bold text-blue-600">{games.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-slate-600 mb-1">Joueurs en ligne</p>
              <p className="text-2xl font-bold text-purple-600">
                {games.reduce((sum, g) => sum + g.players, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-slate-600 mb-1">Note moyenne</p>
              <p className="text-2xl font-bold text-yellow-600">
                {(
                  games.reduce((sum, g) => sum + g.rating, 0) / games.length
                ).toFixed(1)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-slate-600 mb-1">Catégories</p>
              <p className="text-2xl font-bold text-emerald-600">
                {new Set(games.map((g) => g.category)).size}
              </p>
            </div>
          </div>
        </div>

        {/* Auth CTA */}
        {!isAuthenticated && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Prêt à jouer ? 🚀</h3>
            <p className="mb-6 text-blue-100">
              Créez un compte ou connectez-vous pour accéder à tous les jeux
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => router.push("/login")}
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Se connecter
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
              >
                S'inscrire gratuitement
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
