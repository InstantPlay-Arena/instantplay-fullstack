import { getMockGames, fetchGames } from '@/lib/games'

describe('Games Service', () => {
  describe('getMockGames', () => {
    it('should return mock games array', () => {
      const games = getMockGames()

      expect(Array.isArray(games)).toBe(true)
      expect(games.length).toBeGreaterThan(0)
    })

    it('should have required game properties', () => {
      const games = getMockGames()
      const game = games[0]

      expect(game).toHaveProperty('id')
      expect(game).toHaveProperty('name')
      expect(game).toHaveProperty('description')
      expect(game).toHaveProperty('category')
      expect(game).toHaveProperty('players')
      expect(game).toHaveProperty('rating')
    })

    it('should have valid rating values', () => {
      const games = getMockGames()

      games.forEach((game) => {
        expect(game.rating).toBeGreaterThanOrEqual(0)
        expect(game.rating).toBeLessThanOrEqual(5)
      })
    })
  })

  describe('fetchGames', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should return mock games on API error', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Network error'))
      )

      const games = await fetchGames()

      expect(Array.isArray(games)).toBe(true)
      expect(games.length).toBeGreaterThan(0)
    })
  })
})
