import { useEffect, useState } from 'react'
import { useSpring, animated, config } from '@react-spring/three'
import type { Square, PieceSymbol, Color } from 'chess.js'
import { squareTo3DPosition } from '../../utils/chessHelpers'
import { ChessPiece } from '../pieces/ChessPiece'

interface CaptureEffectProps {
  capturedPiece: {
    type: PieceSymbol
    color: Color
    square: Square
  }
  onComplete?: () => void
}

export function CaptureEffect({ capturedPiece, onComplete }: CaptureEffectProps) {
  const [isVisible, setIsVisible] = useState(true)
  const position = squareTo3DPosition(capturedPiece.square)

  const [springs] = useSpring(() => ({
    position: [position.x, position.y + 2, position.z],
    rotation: [0, Math.PI * 2, 0],
    scale: [0.1, 0.1, 0.1],
    opacity: 0,
    config: config.slow,
    onRest: () => {
      setIsVisible(false)
      onComplete?.()
    }
  }))

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <animated.group
      position={springs.position as any}
      rotation={springs.rotation as any}
      scale={springs.scale as any}
    >
      <ChessPiece
        type={capturedPiece.type}
        color={capturedPiece.color}
        square={capturedPiece.square}
      />
    </animated.group>
  )
}

interface CapturedPiecesDisplayProps {
  capturedPieces: Array<{
    type: PieceSymbol
    color: Color
    id: string
  }>
  side: 'white' | 'black'
}

export function CapturedPiecesDisplay({ capturedPieces, side }: CapturedPiecesDisplayProps) {
  const baseX = side === 'white' ? -5 : 5
  const baseZ = -4.5

  return (
    <group position={[baseX, 0, baseZ]}>
      {capturedPieces.map((piece, index) => {
        const row = Math.floor(index / 4)
        const col = index % 4
        const x = col * 0.6
        const z = row * 0.6

        return (
          <FadeInEffect key={piece.id} delay={index * 0.1}>
            <group position={[x, 0, z]}>
              <ChessPiece
                type={piece.type}
                color={piece.color}
                square={'a1' as Square}
              />
            </group>
          </FadeInEffect>
        )
      })}
    </group>
  )
}

interface FadeInEffectProps {
  delay?: number
  children: React.ReactNode
}

function FadeInEffect({ delay = 0, children }: FadeInEffectProps) {
  const [springs] = useSpring(() => ({
    from: { scale: [0, 0, 0], opacity: 0 },
    to: { scale: [0.6, 0.6, 0.6], opacity: 1 },
    delay: delay * 1000,
    config: config.gentle
  }))

  return (
    <animated.group scale={springs.scale as any}>
      {children}
    </animated.group>
  )
}

interface ExplosionEffectProps {
  position: Vector3
  onComplete?: () => void
}

export function ExplosionEffect({ position, onComplete }: ExplosionEffectProps) {
  const particleCount = 8
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2
    const distance = 1 + Math.random() * 0.5
    return {
      id: i,
      targetX: Math.cos(angle) * distance,
      targetZ: Math.sin(angle) * distance,
      targetY: 0.5 + Math.random() * 0.5
    }
  })

  const [springs] = useSpring(() => ({
    particles: particles.map(() => ({
      position: [position.x, position.y, position.z],
      scale: [0.1, 0.1, 0.1],
      opacity: 1
    })),
    to: {
      particles: particles.map(p => ({
        position: [position.x + p.targetX, position.y + p.targetY, position.z + p.targetZ],
        scale: [0.05, 0.05, 0.05],
        opacity: 0
      }))
    },
    config: config.slow,
    onRest: onComplete
  }))

  return (
    <group>
      {particles.map((particle, index) => (
        <animated.mesh
          key={index}
          position={(springs.particles as any)[index]?.position || [position.x, position.y, position.z]}
          scale={(springs.particles as any)[index]?.scale || [0.1, 0.1, 0.1]}
        >
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color="#ff6b6b" transparent />
        </animated.mesh>
      ))}
    </group>
  )
}