import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GameStatus } from '../components/GameStatus'
import { GameControls } from '../components/GameControls'
import { useGameStore } from '../store/gameStore'

describe('GameStatus', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  it('should render initial game status', () => {
    render(<GameStatus />)
    
    expect(screen.getByText('Game Status')).toBeInTheDocument()
    expect(screen.getByText("White's turn")).toBeInTheDocument()
    expect(screen.getByText('Current Turn')).toBeInTheDocument()
    expect(screen.getByText('White')).toBeInTheDocument()
  })

  it('should display move count correctly', () => {
    render(<GameStatus />)
    
    expect(screen.getByText('Move Number')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should show last move as None initially', () => {
    render(<GameStatus />)
    
    expect(screen.getByText('Last Move')).toBeInTheDocument()
    expect(screen.getByText('None')).toBeInTheDocument()
  })

  it('should update status after a move', () => {
    const { makeMove } = useGameStore.getState()
    makeMove('e2', 'e4')
    
    render(<GameStatus />)
    
    expect(screen.getByText("Black's turn")).toBeInTheDocument()
  })

  it('should display check status', () => {
    const { game, updateGameStatus } = useGameStore.getState()
    game.load('rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3')
    updateGameStatus()
    
    render(<GameStatus />)
    
    expect(screen.getByText('White is in check!')).toBeInTheDocument()
    expect(screen.getByText('Check!')).toBeInTheDocument()
  })

  it('should show game over message for checkmate', () => {
    const { game, updateGameStatus } = useGameStore.getState()
    game.load('rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKB1R w Qkq - 2 4')
    game.move({ from: 'h4', to: 'f2' })
    updateGameStatus()
    
    render(<GameStatus />)
    
    expect(screen.getByText(/Checkmate!/)).toBeInTheDocument()
    expect(screen.getByText(/Game Over!/)).toBeInTheDocument()
  })
})

describe('GameControls', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  it('should render game controls', () => {
    render(<GameControls />)
    
    expect(screen.getByText('Game Controls')).toBeInTheDocument()
    expect(screen.getByText('🔄 New Game')).toBeInTheDocument()
    expect(screen.getByText('↶ Undo Move')).toBeInTheDocument()
  })

  it('should have undo button disabled initially', () => {
    render(<GameControls />)
    
    const undoButton = screen.getByText('↶ Undo Move')
    expect(undoButton).toBeDisabled()
  })

  it('should enable undo button after a move', () => {
    const { makeMove } = useGameStore.getState()
    makeMove('e2', 'e4')
    
    render(<GameControls />)
    
    const undoButton = screen.getByText('↶ Undo Move')
    expect(undoButton).not.toBeDisabled()
  })

  it('should reset game when new game is clicked with no moves', () => {
    const resetSpy = vi.spyOn(useGameStore.getState(), 'resetGame')
    
    render(<GameControls />)
    
    const newGameButton = screen.getByText('🔄 New Game')
    fireEvent.click(newGameButton)
    
    expect(resetSpy).toHaveBeenCalled()
  })

  it('should show confirmation dialog when new game is clicked with moves', () => {
    const { makeMove } = useGameStore.getState()
    makeMove('e2', 'e4')
    
    render(<GameControls />)
    
    const newGameButton = screen.getByText('🔄 New Game')
    fireEvent.click(newGameButton)
    
    expect(screen.getByText('Start a new game?')).toBeInTheDocument()
    expect(screen.getByText('Yes, Reset')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('should cancel new game dialog', () => {
    const { makeMove } = useGameStore.getState()
    makeMove('e2', 'e4')
    
    render(<GameControls />)
    
    const newGameButton = screen.getByText('🔄 New Game')
    fireEvent.click(newGameButton)
    
    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)
    
    expect(screen.queryByText('Start a new game?')).not.toBeInTheDocument()
  })

  it('should confirm new game and reset', () => {
    const { makeMove } = useGameStore.getState()
    makeMove('e2', 'e4')
    
    const resetSpy = vi.spyOn(useGameStore.getState(), 'resetGame')
    
    render(<GameControls />)
    
    const newGameButton = screen.getByText('🔄 New Game')
    fireEvent.click(newGameButton)
    
    const confirmButton = screen.getByText('Yes, Reset')
    fireEvent.click(confirmButton)
    
    expect(resetSpy).toHaveBeenCalled()
    expect(screen.queryByText('Start a new game?')).not.toBeInTheDocument()
  })

  it('should execute undo move when clicked', () => {
    const { makeMove } = useGameStore.getState()
    makeMove('e2', 'e4')
    
    const undoSpy = vi.spyOn(useGameStore.getState(), 'undoMove')
    
    render(<GameControls />)
    
    const undoButton = screen.getByText('↶ Undo Move')
    fireEvent.click(undoButton)
    
    expect(undoSpy).toHaveBeenCalled()
  })

  it('should display game controls instructions', () => {
    render(<GameControls />)
    
    expect(screen.getByText('Controls:')).toBeInTheDocument()
    expect(screen.getByText(/Click a piece to select/)).toBeInTheDocument()
    expect(screen.getByText(/Use mouse wheel or pinch to zoom/)).toBeInTheDocument()
  })

  it('should show game complete message when game is over', () => {
    const { game, updateGameStatus } = useGameStore.getState()
    game.load('rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKB1R w Qkq - 2 4')
    game.move({ from: 'h4', to: 'f2' })
    updateGameStatus()
    
    render(<GameControls />)
    
    expect(screen.getByText('Game Complete!')).toBeInTheDocument()
    expect(screen.getByText(/Start a new game to play again/)).toBeInTheDocument()
  })
})