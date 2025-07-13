import { useState, useCallback, useRef } from 'react'
import { Vector3 } from 'three'
import { Square } from 'chess.js'
import { useGameStore } from '../store/gameStore'
import { position3DToSquare, squareTo3DPosition } from '../utils/chessHelpers'

export interface DragState {
  isDragging: boolean
  draggedPiece: Square | null
  dragPosition: Vector3 | null
  dragOffset: Vector3 | null
  hoveredSquare: Square | null
}

export interface PieceMovementState extends DragState {
  startDrag: (square: Square, startPosition: Vector3, offset: Vector3) => void
  updateDrag: (position: Vector3) => void
  endDrag: () => void
  canDropOnSquare: (square: Square) => boolean
  isValidDrop: () => boolean
}

export function usePieceMovement() {
  const { game, selectedSquare, possibleMoves, makeMove, selectSquare, currentPlayer } = useGameStore()
  
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedPiece: null,
    dragPosition: null,
    dragOffset: null,
    hoveredSquare: null
  })

  const animationFrameRef = useRef<number>()

  const startDrag = useCallback((square: Square, startPosition: Vector3, offset: Vector3) => {
    const piece = game.get(square)
    
    if (piece && piece.color === currentPlayer) {
      setDragState({
        isDragging: true,
        draggedPiece: square,
        dragPosition: startPosition,
        dragOffset: offset,
        hoveredSquare: null
      })
      
      selectSquare(square)
    }
  }, [game, currentPlayer, selectSquare])

  const updateDrag = useCallback((position: Vector3) => {
    if (!dragState.isDragging) return

    const hoveredSquare = position3DToSquare({
      x: position.x,
      y: 0,
      z: position.z
    })

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setDragState(prev => ({
        ...prev,
        dragPosition: position,
        hoveredSquare
      }))
    })
  }, [dragState.isDragging])

  const canDropOnSquare = useCallback((square: Square) => {
    if (!dragState.draggedPiece) return false
    
    return possibleMoves.some(move => 
      move.from === dragState.draggedPiece && move.to === square
    )
  }, [dragState.draggedPiece, possibleMoves])

  const isValidDrop = useCallback(() => {
    if (!dragState.draggedPiece || !dragState.hoveredSquare) return false
    
    return canDropOnSquare(dragState.hoveredSquare)
  }, [dragState.draggedPiece, dragState.hoveredSquare, canDropOnSquare])

  const endDrag = useCallback(() => {
    if (!dragState.isDragging) return

    let moveExecuted = false

    if (dragState.draggedPiece && dragState.hoveredSquare) {
      if (canDropOnSquare(dragState.hoveredSquare)) {
        moveExecuted = makeMove(dragState.draggedPiece, dragState.hoveredSquare)
      }
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    setDragState({
      isDragging: false,
      draggedPiece: null,
      dragPosition: null,
      dragOffset: null,
      hoveredSquare: null
    })

    return moveExecuted
  }, [dragState, canDropOnSquare, makeMove])

  const getDraggedPiecePosition = useCallback((originalSquare: Square) => {
    if (dragState.isDragging && dragState.draggedPiece === originalSquare && dragState.dragPosition) {
      return dragState.dragPosition
    }
    
    return squareTo3DPosition(originalSquare)
  }, [dragState])

  const isPieceDragging = useCallback((square: Square) => {
    return dragState.isDragging && dragState.draggedPiece === square
  }, [dragState])

  const getHoveredSquareStyle = useCallback((square: Square) => {
    if (dragState.hoveredSquare === square) {
      return canDropOnSquare(square) ? 'valid-drop' : 'invalid-drop'
    }
    return 'normal'
  }, [dragState.hoveredSquare, canDropOnSquare])

  const resetDrag = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    setDragState({
      isDragging: false,
      draggedPiece: null,
      dragPosition: null,
      dragOffset: null,
      hoveredSquare: null
    })
  }, [])

  return {
    ...dragState,
    startDrag,
    updateDrag,
    endDrag,
    canDropOnSquare,
    isValidDrop,
    getDraggedPiecePosition,
    isPieceDragging,
    getHoveredSquareStyle,
    resetDrag,
    possibleMoves
  }
}