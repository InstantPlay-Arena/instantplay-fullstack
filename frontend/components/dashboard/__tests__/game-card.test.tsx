import { render, screen } from '@testing-library/react'
import { GameCard } from '@/components/dashboard/game-card'
import { Game } from '@/lib/games'

const mockGame: Game = {
  id: '1',
  name: 'Test Game',
  description: 'A test game description',
  category: 'Action',
  players: 1000,
  rating: 4.5,
}

describe('GameCard Component', () => {
  it('renders game card with correct information', () => {
    const mockOnPlay = jest.fn()

    render(
      <GameCard game={mockGame} onPlay={mockOnPlay} />
    )

    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.getByText('A test game description')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText(/1\s*000/)).toBeInTheDocument()
  })

  it('calls onPlay when play button is clicked', () => {
    const mockOnPlay = jest.fn()

    render(
      <GameCard game={mockGame} onPlay={mockOnPlay} />
    )

    const playButton = screen.getByText('Jouer')
    playButton.click()

    expect(mockOnPlay).toHaveBeenCalledWith('1')
  })
})
