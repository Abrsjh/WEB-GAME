import { useRef, useEffect } from 'react'
import { useSpring, animated, config } from '@react-spring/three'
import { Vector3 } from 'three'
import { Square } from 'chess.js'
import { squareTo3DPosition } from '../../utils/chessHelpers'

interface PieceAnimationProps {
  square: Square
  isMoving?: boolean
  fromSquare?: Square | null
  duration?: number
  onAnimationComplete?: () => void
  children: React.ReactNode
}

export function PieceAnimation({
  square,
  isMoving = false,
  fromSquare = null,
  duration = 0.5,
  onAnimationComplete,
  children
}: PieceAnimationProps) {
  const targetPosition = squareTo3DPosition(square)
  const startPosition = fromSquare ? squareTo3DPosition(fromSquare) : targetPosition
  
  const [springs, api] = useSpring(() => ({
    position: [startPosition.x, startPosition.y + 0.05, startPosition.z],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    config: config.gentle,
    onRest: onAnimationComplete
  }))

  useEffect(() => {
    if (isMoving && fromSquare) {
      api.start({
        position: [targetPosition.x, targetPosition.y + 0.05, targetPosition.z],
        config: { ...config.gentle, duration: duration * 1000 }
      })
    } else {
      api.set({
        position: [targetPosition.x, targetPosition.y + 0.05, targetPosition.z]
      })
    }
  }, [square, isMoving, fromSquare, targetPosition, api, duration])

  return (
    <animated.group
      position={springs.position}
      rotation={springs.rotation}
      scale={springs.scale}
    >
      {children}
    </animated.group>
  )
}

interface HoverAnimationProps {
  isHovered?: boolean
  isSelected?: boolean
  children: React.ReactNode
}

export function HoverAnimation({
  isHovered = false,
  isSelected = false,
  children
}: HoverAnimationProps) {
  const [springs] = useSpring(() => ({
    scale: isSelected ? [1.1, 1.1, 1.1] : isHovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    position: isHovered || isSelected ? [0, 0.02, 0] : [0, 0, 0],
    config: config.wobbly
  }))

  return (
    <animated.group
      scale={springs.scale}
      position={springs.position}
    >
      {children}
    </animated.group>
  )
}

interface BoardAnimationProps {
  isHighlighted?: boolean
  isSelected?: boolean
  children: React.ReactNode
}

export function BoardAnimation({
  isHighlighted = false,
  isSelected = false,
  children
}: BoardAnimationProps) {
  const [springs] = useSpring(() => ({
    scale: isSelected ? [1.02, 1.2, 1.02] : isHighlighted ? [1.01, 1.1, 1.01] : [1, 1, 1],
    position: isSelected ? [0, 0.01, 0] : isHighlighted ? [0, 0.005, 0] : [0, 0, 0],
    config: config.gentle
  }))

  return (
    <animated.group
      scale={springs.scale}
      position={springs.position}
    >
      {children}
    </animated.group>
  )
}

interface FadeAnimationProps {
  isVisible?: boolean
  duration?: number
  children: React.ReactNode
}

export function FadeAnimation({
  isVisible = true,
  duration = 0.3,
  children
}: FadeAnimationProps) {
  const [springs] = useSpring(() => ({
    opacity: isVisible ? 1 : 0,
    scale: isVisible ? [1, 1, 1] : [0.8, 0.8, 0.8],
    config: { ...config.gentle, duration: duration * 1000 }
  }))

  return (
    <animated.group
      scale={springs.scale}
    >
      {children}
    </animated.group>
  )
}