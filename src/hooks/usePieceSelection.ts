import { useState, useCallback } from 'react'
import { Square } from 'chess.js'
import { useGameStore } from '../store/gameStore'

export interface PieceSelectionState {
  selectedSquare: Square | null
  highlightedSquares: Square[]
  isSquareSelected: (square: Square) => boolean
  isSquareHighlighted: (square: Square) => boolean
  canSelectPiece: (square: Square) => boolean
}

export function usePieceSelection() {
  const { 
    game, 
    selectedSquare, 
    possibleMoves, 
    selectSquare, 
    currentPlayer 
  } = useGameStore()

  const highlightedSquares = possibleMoves.map(move => move.to)

  const isSquareSelected = useCallback((square: Square) => {
    return selectedSquare === square
  }, [selectedSquare])

  const isSquareHighlighted = useCallback((square: Square) => {
    return highlightedSquares.includes(square)
  }, [highlightedSquares])

  const canSelectPiece = useCallback((square: Square) => {
    const piece = game.get(square)
    return piece !== null && piece.color === currentPlayer
  }, [game, currentPlayer])

  const handleSquareClick = useCallback((square: Square) => {
    selectSquare(square)
  }, [selectSquare])

  const handlePieceClick = useCallback((square: Square) => {
    const piece = game.get(square)
    
    if (piece && piece.color === currentPlayer) {
      selectSquare(square)
    } else if (selectedSquare && highlightedSquares.includes(square)) {
      selectSquare(square)
    }
  }, [game, currentPlayer, selectedSquare, highlightedSquares, selectSquare])

  const clearSelection = useCallback(() => {
    if (selectedSquare) {
      selectSquare(selectedSquare)
    }
  }, [selectedSquare, selectSquare])

  const getSquareStatus = useCallback((square: Square) => {
    if (isSquareSelected(square)) return 'selected'
    if (isSquareHighlighted(square)) return 'highlighted'
    if (canSelectPiece(square)) return 'selectable'
    return 'normal'
  }, [isSquareSelected, isSquareHighlighted, canSelectPiece])

  return {
    selectedSquare,
    highlightedSquares,
    isSquareSelected,
    isSquareHighlighted,
    canSelectPiece,
    handleSquareClick,
    handlePieceClick,
    clearSelection,
    getSquareStatus,
    possibleMoves,
    currentPlayer
  }
}