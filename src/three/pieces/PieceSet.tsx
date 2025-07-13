import { useMemo } from 'react'
import { Square, Piece } from 'chess.js'
import { ChessPiece } from './ChessPiece'
import { useGameStore } from '../../store/gameStore'
import { getAllSquares } from '../../utils/chessHelpers'

interface PieceSetProps {
  onPieceClick?: (square: Square) => void
}

export function PieceSet({ onPieceClick }: PieceSetProps) {
  const { game, selectedSquare } = useGameStore()
  
  const pieces = useMemo(() => {
    const pieceArray: Array<{ piece: Piece; square: Square }> = []
    
    getAllSquares().forEach(square => {
      const piece = game.get(square)
      if (piece) {
        pieceArray.push({ piece, square })
      }
    })
    
    return pieceArray
  }, [game])

  return (
    <group>
      {pieces.map(({ piece, square }) => (
        <ChessPiece
          key={square}
          type={piece.type}
          color={piece.color}
          square={square}
          isSelected={selectedSquare === square}
          onClick={onPieceClick}
        />
      ))}
    </group>
  )
}