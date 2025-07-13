import { useRef, useState, memo, useMemo } from 'react'
import { Mesh } from 'three'
import { getAllSquares, isLightSquare, squareTo3DPosition } from '../utils/chessHelpers'
import { Square } from 'chess.js'
import { BoardAnimation } from './animations'

interface ChessBoardProps {
  onSquareClick?: (square: Square) => void
  selectedSquare?: Square | null
  highlightedSquares?: Square[]
}

const ChessSquare = memo(function ChessSquare({ 
  square, 
  isLight, 
  position, 
  isSelected, 
  isHighlighted, 
  onClick 
}: {
  square: Square
  isLight: boolean
  position: [number, number, number]
  isSelected: boolean
  isHighlighted: boolean
  onClick?: (square: Square) => void
}) {
  const meshRef = useRef<Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const colors = useMemo(() => {
    const baseColor = isLight ? '#f0d9b5' : '#b58863'
    const selectedColor = '#ffff00'
    const highlightColor = '#90ee90'
    const hoverColor = isLight ? '#f5e6c1' : '#c19a76'
    
    let color = baseColor
    if (isSelected) color = selectedColor
    else if (isHighlighted) color = highlightColor
    else if (isHovered) color = hoverColor
    
    return { color }
  }, [isLight, isSelected, isHighlighted, isHovered])

  const handleClick = (event: any) => {
    event.stopPropagation()
    onClick?.(square)
  }

  const handlePointerEnter = () => {
    setIsHovered(true)
    if (!isSelected && !isHighlighted) {
      document.body.style.cursor = 'pointer'
    }
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    document.body.style.cursor = 'default'
  }

  return (
    <BoardAnimation isHighlighted={isHighlighted} isSelected={isSelected}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        receiveShadow
      >
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial 
          color={colors.color}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </BoardAnimation>
  )
})

export const ChessBoard = memo(function ChessBoard({ 
  onSquareClick, 
  selectedSquare, 
  highlightedSquares = [] 
}: ChessBoardProps) {
  const squares = useMemo(() => getAllSquares(), [])

  return (
    <group>
      {squares.map((square) => {
        const position = squareTo3DPosition(square)
        const isLight = isLightSquare(square)
        const isSelected = selectedSquare === square
        const isHighlighted = highlightedSquares.includes(square)
        
        return (
          <ChessSquare
            key={square}
            square={square}
            isLight={isLight}
            position={[position.x, position.y, position.z]}
            isSelected={isSelected}
            isHighlighted={isHighlighted}
            onClick={onSquareClick}
          />
        )
      })}
      
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <boxGeometry args={[8.2, 0.02, 8.2]} />
        <meshStandardMaterial 
          color="#8B4513"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
})