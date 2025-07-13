import { describe, it, expect } from 'vitest'
import type { PieceSymbol } from 'chess.js'
import { 
  squareToCoordinates,
  coordinatesToSquare,
  squareTo3DPosition,
  position3DToSquare,
  isLightSquare,
  isDarkSquare,
  getPieceTypeFromSymbol,
  getColorFromPiece,
  getAllSquares,
  isValidSquare,
  getSquareColor
} from '../utils/chessHelpers'

describe('Chess Helpers', () => {
  describe('squareToCoordinates', () => {
    it('should convert a1 to coordinates', () => {
      const coords = squareToCoordinates('a1')
      expect(coords).toEqual({ file: 0, rank: 0 })
    })

    it('should convert h8 to coordinates', () => {
      const coords = squareToCoordinates('h8')
      expect(coords).toEqual({ file: 7, rank: 7 })
    })

    it('should convert e4 to coordinates', () => {
      const coords = squareToCoordinates('e4')
      expect(coords).toEqual({ file: 4, rank: 3 })
    })
  })

  describe('coordinatesToSquare', () => {
    it('should convert coordinates to a1', () => {
      const square = coordinatesToSquare(0, 0)
      expect(square).toBe('a1')
    })

    it('should convert coordinates to h8', () => {
      const square = coordinatesToSquare(7, 7)
      expect(square).toBe('h8')
    })

    it('should convert coordinates to e4', () => {
      const square = coordinatesToSquare(4, 3)
      expect(square).toBe('e4')
    })
  })

  describe('squareTo3DPosition', () => {
    it('should convert square to 3D position', () => {
      const pos = squareTo3DPosition('e4')
      expect(pos.x).toBeCloseTo(0.5)
      expect(pos.y).toBe(0)
      expect(pos.z).toBeCloseTo(-0.5)
    })

    it('should convert a1 to 3D position', () => {
      const pos = squareTo3DPosition('a1')
      expect(pos.x).toBeCloseTo(-3.5)
      expect(pos.y).toBe(0)
      expect(pos.z).toBeCloseTo(-3.5)
    })
  })

  describe('position3DToSquare', () => {
    it('should convert 3D position to square', () => {
      const square = position3DToSquare({ x: 0.5, y: 0, z: -0.5 })
      expect(square).toBe('e4')
    })

    it('should return null for invalid position', () => {
      const square = position3DToSquare({ x: 10, y: 0, z: 10 })
      expect(square).toBeNull()
    })
  })

  describe('isLightSquare', () => {
    it('should identify light squares', () => {
      expect(isLightSquare('a1')).toBe(true)
      expect(isLightSquare('h8')).toBe(true)
      expect(isLightSquare('e4')).toBe(true)
    })

    it('should identify dark squares', () => {
      expect(isLightSquare('a8')).toBe(false)
      expect(isLightSquare('h1')).toBe(false)
      expect(isLightSquare('d4')).toBe(false)
    })
  })

  describe('isDarkSquare', () => {
    it('should identify dark squares', () => {
      expect(isDarkSquare('a8')).toBe(true)
      expect(isDarkSquare('h1')).toBe(true)
      expect(isDarkSquare('d4')).toBe(true)
    })

    it('should identify light squares as not dark', () => {
      expect(isDarkSquare('a1')).toBe(false)
      expect(isDarkSquare('h8')).toBe(false)
      expect(isDarkSquare('e4')).toBe(false)
    })
  })

  describe('getPieceTypeFromSymbol', () => {
    it('should return correct piece types', () => {
      expect(getPieceTypeFromSymbol('p')).toBe('pawn')
      expect(getPieceTypeFromSymbol('r')).toBe('rook')
      expect(getPieceTypeFromSymbol('n')).toBe('knight')
      expect(getPieceTypeFromSymbol('b')).toBe('bishop')
      expect(getPieceTypeFromSymbol('q')).toBe('queen')
      expect(getPieceTypeFromSymbol('k')).toBe('king')
    })

    it('should handle uppercase symbols', () => {
      expect(getPieceTypeFromSymbol('p' as PieceSymbol)).toBe('pawn')
      expect(getPieceTypeFromSymbol('q' as PieceSymbol)).toBe('queen')
    })
  })

  describe('getColorFromPiece', () => {
    it('should return white for w', () => {
      expect(getColorFromPiece('w')).toBe('white')
    })

    it('should return black for b', () => {
      expect(getColorFromPiece('b')).toBe('black')
    })
  })

  describe('getAllSquares', () => {
    it('should return all 64 squares', () => {
      const squares = getAllSquares()
      expect(squares).toHaveLength(64)
      expect(squares).toContain('a1')
      expect(squares).toContain('h8')
      expect(squares).toContain('e4')
    })

    it('should return squares in correct order', () => {
      const squares = getAllSquares()
      expect(squares[0]).toBe('a1')
      expect(squares[7]).toBe('h1')
      expect(squares[56]).toBe('a8')
      expect(squares[63]).toBe('h8')
    })
  })

  describe('isValidSquare', () => {
    it('should validate correct squares', () => {
      expect(isValidSquare('a1')).toBe(true)
      expect(isValidSquare('h8')).toBe(true)
      expect(isValidSquare('e4')).toBe(true)
    })

    it('should reject invalid squares', () => {
      expect(isValidSquare('i1')).toBe(false)
      expect(isValidSquare('a9')).toBe(false)
      expect(isValidSquare('z5')).toBe(false)
      expect(isValidSquare('e0')).toBe(false)
      expect(isValidSquare('')).toBe(false)
      expect(isValidSquare('abc')).toBe(false)
    })
  })

  describe('getSquareColor', () => {
    it('should return light for light squares', () => {
      expect(getSquareColor('a1')).toBe('light')
      expect(getSquareColor('h8')).toBe('light')
    })

    it('should return dark for dark squares', () => {
      expect(getSquareColor('a8')).toBe('dark')
      expect(getSquareColor('h1')).toBe('dark')
    })
  })
})