import { create } from 'zustand'
import { Chess, Square, Move } from 'chess.js'

export interface GameState {
  game: Chess
  selectedSquare: Square | null
  possibleMoves: Move[]
  gameStatus: 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw'
  moveHistory: Move[]
  currentPlayer: 'w' | 'b'
  fen: string
}

export interface GameActions {
  selectSquare: (square: Square) => void
  makeMove: (from: Square, to: Square) => boolean
  resetGame: () => void
  undoMove: () => void
  updateGameStatus: () => void
}

export type GameStore = GameState & GameActions

const initialGame = new Chess()

export const useGameStore = create<GameStore>((set, get) => ({
  game: initialGame,
  selectedSquare: null,
  possibleMoves: [],
  gameStatus: 'playing',
  moveHistory: [],
  currentPlayer: 'w',
  fen: initialGame.fen(),

  selectSquare: (square: Square) => {
    const { game, selectedSquare } = get()
    
    if (selectedSquare === square) {
      set({ selectedSquare: null, possibleMoves: [] })
      return
    }

    const piece = game.get(square)
    if (piece && piece.color === game.turn()) {
      const moves = game.moves({ square, verbose: true })
      set({ selectedSquare: square, possibleMoves: moves })
    } else if (selectedSquare) {
      const success = get().makeMove(selectedSquare, square)
      if (success) {
        set({ selectedSquare: null, possibleMoves: [] })
      }
    }
  },

  makeMove: (from: Square, to: Square) => {
    const { game } = get()
    
    try {
      const move = game.move({ from, to })
      if (move) {
        const newHistory = game.history({ verbose: true })
        set({
          fen: game.fen(),
          currentPlayer: game.turn(),
          moveHistory: newHistory,
        })
        get().updateGameStatus()
        return true
      }
    } catch (error) {
      console.warn('Invalid move:', error)
    }
    return false
  },

  resetGame: () => {
    const newGame = new Chess()
    set({
      game: newGame,
      selectedSquare: null,
      possibleMoves: [],
      gameStatus: 'playing',
      moveHistory: [],
      currentPlayer: 'w',
      fen: newGame.fen(),
    })
  },

  undoMove: () => {
    const { game } = get()
    const undoMove = game.undo()
    if (undoMove) {
      const newHistory = game.history({ verbose: true })
      set({
        fen: game.fen(),
        currentPlayer: game.turn(),
        moveHistory: newHistory,
        selectedSquare: null,
        possibleMoves: [],
      })
      get().updateGameStatus()
    }
  },

  updateGameStatus: () => {
    const { game } = get()
    
    if (game.isCheckmate()) {
      set({ gameStatus: 'checkmate' })
    } else if (game.isStalemate()) {
      set({ gameStatus: 'stalemate' })
    } else if (game.isDraw()) {
      set({ gameStatus: 'draw' })
    } else if (game.inCheck()) {
      set({ gameStatus: 'check' })
    } else {
      set({ gameStatus: 'playing' })
    }
  },
}))