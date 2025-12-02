// Service pour récupérer les jeux depuis l'API

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export interface Game {
  id: string
  name: string
  description: string
  category: string
  players: number
  rating: number
  image?: string
}

/**
 * Récupère la liste des jeux depuis l'API
 */
export const fetchGames = async (): Promise<Game[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch games")
    }

    const data: Game[] = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching games:", error)
    // Retourner des jeux mock en cas d'erreur
    return getMockGames()
  }
}

/**
 * Jeux mock pour les tests/démo
 */
export const getMockGames = (): Game[] => [
  {
    id: "1",
    name: "Quick Match",
    description: "Parties rapides de 2-3 minutes. Parfait pour une pause.",
    category: "Action",
    players: 1234,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Battle Arena",
    description: "Combats multijoueurs en temps réel. Affrontez vos rivaux.",
    category: "Combat",
    players: 2156,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Puzzle Rush",
    description: "Résolvez des énigmes contre la montre. Défiez vos amis.",
    category: "Puzzle",
    players: 987,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Team Quest",
    description: "Coopération et stratégie. Formez une équipe et gagnez.",
    category: "Stratégie",
    players: 1543,
    rating: 4.6,
  },
  {
    id: "5",
    name: "Infinite Runner",
    description: "Course infinie avec obstacles. Battez vos records.",
    category: "Action",
    players: 3421,
    rating: 4.5,
  },
  {
    id: "6",
    name: "Mind Chess",
    description: "Échecs au rythme rapide. Pour les tacticiens.",
    category: "Stratégie",
    players: 654,
    rating: 4.9,
  },
]
