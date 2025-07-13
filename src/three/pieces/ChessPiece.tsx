import { useRef, useState, memo } from 'react'
import { Group } from 'three'
import type { Square, PieceSymbol, Color } from 'chess.js'
import { getPieceTypeFromSymbol, getColorFromPiece } from '../../utils/chessHelpers'
import { PieceAnimation, HoverAnimation } from '../animations'
import { 
  PawnGeometry, 
  RookGeometry, 
  KnightGeometry, 
  BishopGeometry, 
  QueenGeometry, 
  KingGeometry 
} from './PieceGeometry'

interface ChessPieceProps {
  type: PieceSymbol
  color: Color
  square: Square
  isSelected?: boolean
  isMoving?: boolean
  fromSquare?: Square | null
  onClick?: (square: Square) => void
  onAnimationComplete?: () => void
}

function getPieceGeometry(type: PieceSymbol) {
  const pieceType = getPieceTypeFromSymbol(type)
  
  switch (pieceType) {
    case 'pawn':
      return <PawnGeometry />
    case 'rook':
      return <RookGeometry />
    case 'knight':
      return <KnightGeometry />
    case 'bishop':
      return <BishopGeometry />
    case 'queen':
      return <QueenGeometry />
    case 'king':
      return <KingGeometry />
    default:
      return <PawnGeometry />
  }
}

export const ChessPiece = memo(function ChessPiece({ 
  type, 
  color, 
  square, 
  isSelected = false, 
  isMoving = false,
  fromSquare = null,
  onClick,
  onAnimationComplete
}: ChessPieceProps) {
  const groupRef = useRef<Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const pieceColor = getColorFromPiece(color)
  
  const materialColor = pieceColor === 'white' ? '#f5f5f5' : '#2c2c2c'

  const handleClick = (event: any) => {
    event.stopPropagation()
    onClick?.(square)
  }

  const handlePointerEnter = () => {
    setIsHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    document.body.style.cursor = 'default'
  }
  
  return (
    <PieceAnimation
      square={square}
      isMoving={isMoving}
      fromSquare={fromSquare}
      onAnimationComplete={onAnimationComplete}
    >
      <HoverAnimation isHovered={isHovered} isSelected={isSelected}>
        <group
          ref={groupRef}
          onClick={handleClick}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <meshStandardMaterial 
            color={materialColor}
            roughness={0.3}
            metalness={0.1}
          />
          {getPieceGeometry(type)}
        </group>
      </HoverAnimation>
    </PieceAnimation>
  )
})