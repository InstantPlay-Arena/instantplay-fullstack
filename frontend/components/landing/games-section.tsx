"use client"

import { Play, Zap, Trophy, Users } from "lucide-react"

interface Game {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  players: number
}

const games: Game[] = [
  {
    id: "quick-match",
    name: "Quick Match",
    description: "Parties rapides de 2-3 minutes. Parfait pour une pause.",
    icon: <Zap className="w-8 h-8" />,
    color: "from-yellow-400 to-orange-500",
    players: 1234,
  },
  {
    id: "battle-arena",
    name: "Battle Arena",
    description: "Combats multijoueurs en temps réel. Affrontez vos rivaux.",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-red-400 to-pink-500",
    players: 2156,
  },
  {
    id: "puzzle-rush",
    name: "Puzzle Rush",
    description: "Résolvez des énigmes contre la montre. Défiez vos amis.",
    icon: <Play className="w-8 h-8" />,
    color: "from-green-400 to-emerald-500",
    players: 987,
  },
  {
    id: "team-quest",
    name: "Team Quest",
    description: "Coopération et stratégie. Formez une équipe et gagnez.",
    icon: <Users className="w-8 h-8" />,
    color: "from-blue-400 to-cyan-500",
    players: 1543,
  },
]

export function GamesSection() {
  return (
    <section id="games" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 animate-fade-in">
            Nos jeux populaires
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Découvrez notre sélection de jeux instantanés. Du casual au compétitif, il y a quelque chose pour tout le monde.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <div
              key={game.id}
              className="group relative rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-slate-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-15 transition-all duration-300`}></div>

              {/* Top border accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${game.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative p-6 space-y-4 h-full flex flex-col">
                {/* Icon with scale effect */}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${game.color} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 w-fit`}>
                  {game.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {game.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {game.description}
                </p>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between group-hover:border-slate-300 transition-colors">
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                    {game.players.toLocaleString()} joueurs
                  </span>
                  <button className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-90">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <a href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            Voir tous les jeux
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
