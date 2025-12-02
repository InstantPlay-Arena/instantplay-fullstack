"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Game } from "@/lib/games"
import { Star, Users, Play } from "lucide-react"

interface GameCardProps {
  game: Game
  onPlay: (gameId: string) => void
}

export function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <Card className="group hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden">
      {/* Header avec gradient */}
      <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="group-hover:text-blue-600 transition-colors">
              {game.name}
            </CardTitle>
            <CardDescription className="mt-1 text-xs font-medium text-blue-600">
              {game.category}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-yellow-700">
              {game.rating}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-slate-600 line-clamp-2">
          {game.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1 text-slate-600">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">
            {game.players.toLocaleString()}
          </span>
        </div>
        <Button
          onClick={() => onPlay(game.id)}
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group/btn hover:scale-105 transition-transform"
        >
          Jouer
          <Play className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  )
}
