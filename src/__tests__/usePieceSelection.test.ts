import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePieceSelection } from '../hooks/usePieceSelection'
import { useGameStore } from '../store/gameStore'

describe('usePieceSelection', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  it('should return initial state correctly', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    expect(result.current.selectedSquare).toBeNull()
    expect(result.current.highlightedSquares).toEqual([])
    expect(result.current.currentPlayer).toBe('w')
  })

  it('should identify selectable pieces correctly', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    expect(result.current.canSelectPiece('e2')).toBe(true)
    expect(result.current.canSelectPiece('e7')).toBe(false)
    expect(result.current.canSelectPiece('e4')).toBe(false)
  })

  it('should handle square selection', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    act(() => {
      result.current.handleSquareClick('e2')
    })
    
    expect(result.current.selectedSquare).toBe('e2')
    expect(result.current.highlightedSquares.length).toBeGreaterThan(0)
    expect(result.current.isSquareSelected('e2')).toBe(true)
  })

  it('should handle piece click for own pieces', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    act(() => {
      result.current.handlePieceClick('d2')
    })
    
    expect(result.current.selectedSquare).toBe('d2')
    expect(result.current.isSquareSelected('d2')).toBe(true)
  })

  it('should not select opponent pieces', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    act(() => {
      result.current.handlePieceClick('e7')
    })
    
    expect(result.current.selectedSquare).toBeNull()
  })

  it('should identify highlighted squares correctly', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    act(() => {
      result.current.handleSquareClick('e2')
    })
    
    expect(result.current.isSquareHighlighted('e3')).toBe(true)
    expect(result.current.isSquareHighlighted('e4')).toBe(true)
    expect(result.current.isSquareHighlighted('a1')).toBe(false)
  })

  it('should return correct square status', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    act(() => {
      result.current.handleSquareClick('e2')
    })
    
    expect(result.current.getSquareStatus('e2')).toBe('selected')
    expect(result.current.getSquareStatus('e4')).toBe('highlighted')
    expect(result.current.getSquareStatus('d2')).toBe('selectable')
    expect(result.current.getSquareStatus('e5')).toBe('normal')
  })

  it('should clear selection', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    act(() => {
      result.current.handleSquareClick('e2')
    })
    
    expect(result.current.selectedSquare).toBe('e2')
    
    act(() => {
      result.current.clearSelection()
    })
    
    expect(result.current.selectedSquare).toBeNull()
    expect(result.current.highlightedSquares).toEqual([])
  })

  it('should handle move execution via piece click', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    act(() => {
      result.current.handleSquareClick('e2')
    })
    
    const wasHighlighted = result.current.isSquareHighlighted('e4')
    expect(wasHighlighted).toBe(true)
    
    act(() => {
      result.current.handlePieceClick('e4')
    })
    
    expect(result.current.selectedSquare).toBeNull()
    expect(result.current.currentPlayer).toBe('b')
  })

  it('should switch current player after moves', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    expect(result.current.currentPlayer).toBe('w')
    
    act(() => {
      result.current.handleSquareClick('e2')
    })
    
    act(() => {
      result.current.handleSquareClick('e4')
    })
    
    expect(result.current.currentPlayer).toBe('b')
  })

  it('should provide possible moves for selected piece', () => {
    const { result } = renderHook(() => usePieceSelection())
    
    act(() => {
      result.current.handleSquareClick('e2')
    })
    
    expect(result.current.possibleMoves.length).toBeGreaterThan(0)
    expect(result.current.possibleMoves.some(move => move.to === 'e3')).toBe(true)
    expect(result.current.possibleMoves.some(move => move.to === 'e4')).toBe(true)
  })
})