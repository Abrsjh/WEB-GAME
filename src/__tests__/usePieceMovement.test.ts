import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { Vector3 } from 'three'
import { usePieceMovement } from '../hooks/usePieceMovement'
import { useGameStore } from '../store/gameStore'

describe('usePieceMovement', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
    vi.clearAllMocks()
  })

  it('should return initial drag state', () => {
    const { result } = renderHook(() => usePieceMovement())
    
    expect(result.current.isDragging).toBe(false)
    expect(result.current.draggedPiece).toBeNull()
    expect(result.current.dragPosition).toBeNull()
    expect(result.current.hoveredSquare).toBeNull()
  })

  it('should start drag for valid piece', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    expect(result.current.isDragging).toBe(true)
    expect(result.current.draggedPiece).toBe('e2')
    expect(result.current.dragPosition).toEqual(startPosition)
    expect(result.current.dragOffset).toEqual(offset)
  })

  it('should not start drag for opponent piece', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e7', startPosition, offset)
    })
    
    expect(result.current.isDragging).toBe(false)
    expect(result.current.draggedPiece).toBeNull()
  })

  it('should update drag position', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    const newPosition = new Vector3(1, 0, 1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    act(() => {
      result.current.updateDrag(newPosition)
    })
    
    setTimeout(() => {
      expect(result.current.dragPosition).toEqual(newPosition)
    }, 0)
  })

  it('should identify valid drop squares', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    expect(result.current.canDropOnSquare('e3')).toBe(true)
    expect(result.current.canDropOnSquare('e4')).toBe(true)
    expect(result.current.canDropOnSquare('e1')).toBe(false)
  })

  it('should validate drop based on hovered square', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    act(() => {
      result.current.updateDrag(new Vector3(0, 0, 1))
    })
    
    setTimeout(() => {
      expect(result.current.isValidDrop()).toBe(true)
    }, 0)
  })

  it('should end drag and execute valid moves', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    act(() => {
      result.current.updateDrag(new Vector3(0, 0, 1))
    })
    
    let moveExecuted: boolean = false
    act(() => {
      moveExecuted = result.current.endDrag() || false
    })
    
    expect(result.current.isDragging).toBe(false)
    expect(result.current.draggedPiece).toBeNull()
    expect(moveExecuted).toBe(false)
  })

  it('should end drag without executing invalid moves', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    act(() => {
      result.current.updateDrag(new Vector3(3, 0, 3))
    })
    
    let moveExecuted: boolean = false
    act(() => {
      moveExecuted = result.current.endDrag() || false
    })
    
    expect(result.current.isDragging).toBe(false)
    expect(moveExecuted).toBe(false)
  })

  it('should identify dragging pieces', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    expect(result.current.isPieceDragging('e2')).toBe(true)
    expect(result.current.isPieceDragging('d2')).toBe(false)
  })

  it('should provide dragged piece position', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    const newPosition = new Vector3(1, 0, 1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    act(() => {
      result.current.updateDrag(newPosition)
    })
    
    setTimeout(() => {
      const draggedPosition = result.current.getDraggedPiecePosition('e2')
      expect(draggedPosition).toEqual(newPosition)
    }, 0)
  })

  it('should provide hovered square style', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    act(() => {
      result.current.updateDrag(new Vector3(0, 0, 1))
    })
    
    setTimeout(() => {
      expect(result.current.getHoveredSquareStyle('e4')).toBe('valid-drop')
    }, 0)
  })

  it('should reset drag state', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    expect(result.current.isDragging).toBe(true)
    
    act(() => {
      result.current.resetDrag()
    })
    
    expect(result.current.isDragging).toBe(false)
    expect(result.current.draggedPiece).toBeNull()
    expect(result.current.dragPosition).toBeNull()
  })

  it('should handle rapid drag updates', () => {
    const { result } = renderHook(() => usePieceMovement())
    const startPosition = new Vector3(0, 0, 0)
    const offset = new Vector3(0.1, 0.1, 0.1)
    
    act(() => {
      result.current.startDrag('e2', startPosition, offset)
    })
    
    act(() => {
      result.current.updateDrag(new Vector3(0.5, 0, 0.5))
      result.current.updateDrag(new Vector3(1, 0, 1))
      result.current.updateDrag(new Vector3(1.5, 0, 1.5))
    })
    
    expect(result.current.isDragging).toBe(true)
  })
})