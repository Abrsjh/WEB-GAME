import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from '../store/gameStore'

describe('GameStore', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useGameStore.getState()
      
      expect(state.selectedSquare).toBeNull()
      expect(state.possibleMoves).toEqual([])
      expect(state.gameStatus).toBe('playing')
      expect(state.moveHistory).toEqual([])
      expect(state.currentPlayer).toBe('w')
      expect(state.fen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    })

    it('should have a valid chess game instance', () => {
      const { game } = useGameStore.getState()
      
      expect(game.turn()).toBe('w')
      expect(game.inCheck()).toBe(false)
      expect(game.isGameOver()).toBe(false)
    })
  })

  describe('Piece Selection', () => {
    it('should select a piece and show possible moves', () => {
      const { selectSquare } = useGameStore.getState()
      
      selectSquare('e2')
      
      const state = useGameStore.getState()
      expect(state.selectedSquare).toBe('e2')
      expect(state.possibleMoves.length).toBeGreaterThan(0)
      expect(state.possibleMoves.some(move => move.to === 'e4')).toBe(true)
    })

    it('should deselect piece when clicking same square', () => {
      const { selectSquare } = useGameStore.getState()
      
      selectSquare('e2')
      selectSquare('e2')
      
      const state = useGameStore.getState()
      expect(state.selectedSquare).toBeNull()
      expect(state.possibleMoves).toEqual([])
    })

    it('should not select opponent pieces', () => {
      const { selectSquare } = useGameStore.getState()
      
      selectSquare('e7')
      
      const state = useGameStore.getState()
      expect(state.selectedSquare).toBeNull()
      expect(state.possibleMoves).toEqual([])
    })
  })

  describe('Move Execution', () => {
    it('should execute valid moves', () => {
      const { makeMove } = useGameStore.getState()
      
      const success = makeMove('e2', 'e4')
      
      expect(success).toBe(true)
      const state = useGameStore.getState()
      expect(state.currentPlayer).toBe('b')
      expect(state.moveHistory.length).toBe(1)
      expect(state.moveHistory[0].from).toBe('e2')
      expect(state.moveHistory[0].to).toBe('e4')
    })

    it('should reject invalid moves', () => {
      const { makeMove } = useGameStore.getState()
      
      const success = makeMove('e2', 'e5')
      
      expect(success).toBe(false)
      const state = useGameStore.getState()
      expect(state.currentPlayer).toBe('w')
      expect(state.moveHistory.length).toBe(0)
    })

    it('should update FEN after move', () => {
      const { makeMove, fen: initialFen } = useGameStore.getState()
      
      makeMove('e2', 'e4')
      
      const { fen: newFen } = useGameStore.getState()
      expect(newFen).not.toBe(initialFen)
      expect(newFen).toContain('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')
    })
  })

  describe('Turn Switching', () => {
    it('should switch turns after valid move', () => {
      const { makeMove } = useGameStore.getState()
      
      expect(useGameStore.getState().currentPlayer).toBe('w')
      
      makeMove('e2', 'e4')
      expect(useGameStore.getState().currentPlayer).toBe('b')
      
      makeMove('e7', 'e5')
      expect(useGameStore.getState().currentPlayer).toBe('w')
    })
  })

  describe('Game Reset', () => {
    it('should reset to initial state', () => {
      const { makeMove, resetGame } = useGameStore.getState()
      
      makeMove('e2', 'e4')
      makeMove('e7', 'e5')
      
      resetGame()
      
      const state = useGameStore.getState()
      expect(state.selectedSquare).toBeNull()
      expect(state.possibleMoves).toEqual([])
      expect(state.gameStatus).toBe('playing')
      expect(state.moveHistory).toEqual([])
      expect(state.currentPlayer).toBe('w')
      expect(state.fen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    })
  })

  describe('Undo Move', () => {
    it('should undo the last move', () => {
      const { makeMove, undoMove } = useGameStore.getState()
      const initialFen = useGameStore.getState().fen
      
      makeMove('e2', 'e4')
      undoMove()
      
      const state = useGameStore.getState()
      expect(state.fen).toBe(initialFen)
      expect(state.currentPlayer).toBe('w')
      expect(state.moveHistory).toEqual([])
    })

    it('should handle undo when no moves to undo', () => {
      const { undoMove } = useGameStore.getState()
      const initialState = useGameStore.getState()
      
      undoMove()
      
      const state = useGameStore.getState()
      expect(state.fen).toBe(initialState.fen)
      expect(state.moveHistory).toEqual([])
    })
  })

  describe('Game Status Updates', () => {
    it('should detect check status', () => {
      const { game, updateGameStatus } = useGameStore.getState()
      
      game.load('rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3')
      updateGameStatus()
      
      expect(useGameStore.getState().gameStatus).toBe('check')
    })
  })
})