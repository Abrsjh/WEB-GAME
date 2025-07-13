import { useMemo } from 'react'
import { useSpring, animated, config } from '@react-spring/three'
import type { Square } from 'chess.js'
import { squareTo3DPosition } from '../../utils/chessHelpers'

interface BoardHighlightProps {
  square: Square
  type: 'selected' | 'possible-move' | 'last-move' | 'check' | 'hover'
  intensity?: number
}

export function BoardHighlight({ square, type, intensity = 1 }: BoardHighlightProps) {
  const position = squareTo3DPosition(square)
  
  const highlightConfig = useMemo(() => {
    switch (type) {
      case 'selected':
        return {
          color: '#ffff00',
          opacity: 0.6,
          scale: 1.05,
          height: 0.02,
          emissive: '#ffff00',
          emissiveIntensity: 0.3
        }
      case 'possible-move':
        return {
          color: '#90ee90',
          opacity: 0.7,
          scale: 0.8,
          height: 0.05,
          emissive: '#90ee90',
          emissiveIntensity: 0.2
        }
      case 'last-move':
        return {
          color: '#87ceeb',
          opacity: 0.5,
          scale: 1.02,
          height: 0.01,
          emissive: '#87ceeb',
          emissiveIntensity: 0.1
        }
      case 'check':
        return {
          color: '#ff4444',
          opacity: 0.8,
          scale: 1.1,
          height: 0.03,
          emissive: '#ff4444',
          emissiveIntensity: 0.4
        }
      case 'hover':
        return {
          color: '#ffffff',
          opacity: 0.3,
          scale: 1.01,
          height: 0.01,
          emissive: '#ffffff',
          emissiveIntensity: 0.1
        }
      default:
        return {
          color: '#ffffff',
          opacity: 0.3,
          scale: 1,
          height: 0.01,
          emissive: '#ffffff',
          emissiveIntensity: 0.1
        }
    }
  }, [type])

  const [springs] = useSpring(() => ({
    scale: [highlightConfig.scale, 1, highlightConfig.scale],
    opacity: highlightConfig.opacity * intensity,
    emissiveIntensity: highlightConfig.emissiveIntensity * intensity,
    config: type === 'check' ? config.wobbly : config.gentle
  }))

  return (
    <animated.mesh
      position={[position.x, position.y + highlightConfig.height, position.z]}
      scale={springs.scale as any}
    >
      <cylinderGeometry args={[0.45, 0.45, highlightConfig.height, 16]} />
      <animated.meshStandardMaterial
        color={highlightConfig.color}
        transparent
        opacity={springs.opacity}
        emissive={highlightConfig.emissive}
        emissiveIntensity={springs.emissiveIntensity}
      />
    </animated.mesh>
  )
}

interface PossibleMoveIndicatorProps {
  square: Square
  isCapture?: boolean
}

export function PossibleMoveIndicator({ square, isCapture = false }: PossibleMoveIndicatorProps) {
  const position = squareTo3DPosition(square)
  
  const [springs] = useSpring(() => ({
    from: { scale: [0, 0, 0], rotation: [0, 0, 0] },
    to: async (next) => {
      while (true) {
        await next({ scale: [1, 1, 1], rotation: [0, Math.PI * 2, 0] })
        await next({ scale: [0.9, 0.9, 0.9], rotation: [0, Math.PI * 4, 0] })
      }
    },
    config: config.gentle
  }))

  if (isCapture) {
    return (
      <animated.group
        position={[position.x, position.y + 0.1, position.z]}
        scale={springs.scale as any}
        rotation={springs.rotation as any}
      >
        <mesh>
          <torusGeometry args={[0.35, 0.05, 8, 16]} />
          <meshStandardMaterial
            color="#ff6b6b"
            emissive="#ff6b6b"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </animated.group>
    )
  }

  return (
    <animated.mesh
      position={[position.x, position.y + 0.02, position.z]}
      scale={springs.scale as any}
    >
      <cylinderGeometry args={[0.15, 0.15, 0.02, 8]} />
      <meshStandardMaterial
        color="#90ee90"
        emissive="#90ee90"
        emissiveIntensity={0.2}
        transparent
        opacity={0.9}
      />
    </animated.mesh>
  )
}

interface LastMoveHighlightProps {
  fromSquare: Square
  toSquare: Square
}

export function LastMoveHighlight({ fromSquare, toSquare }: LastMoveHighlightProps) {
  const fromPosition = squareTo3DPosition(fromSquare)
  const toPosition = squareTo3DPosition(toSquare)
  
  const [springs] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 0.4 },
    config: config.gentle
  }))

  return (
    <group>
      <animated.mesh
        position={[fromPosition.x, fromPosition.y + 0.01, fromPosition.z]}
      >
        <cylinderGeometry args={[0.45, 0.45, 0.01, 16]} />
        <animated.meshStandardMaterial
          color="#87ceeb"
          transparent
          opacity={springs.opacity}
          emissive="#87ceeb"
          emissiveIntensity={0.1}
        />
      </animated.mesh>
      
      <animated.mesh
        position={[toPosition.x, toPosition.y + 0.01, toPosition.z]}
      >
        <cylinderGeometry args={[0.45, 0.45, 0.01, 16]} />
        <animated.meshStandardMaterial
          color="#87ceeb"
          transparent
          opacity={springs.opacity}
          emissive="#87ceeb"
          emissiveIntensity={0.1}
        />
      </animated.mesh>
    </group>
  )
}

interface CheckIndicatorProps {
  kingSquare: Square
}

export function CheckIndicator({ kingSquare }: CheckIndicatorProps) {
  const position = squareTo3DPosition(kingSquare)
  
  const [springs] = useSpring(() => ({
    from: { scale: [1, 1, 1], opacity: 0.8 },
    to: async (next) => {
      while (true) {
        await next({ scale: [1.2, 1, 1.2], opacity: 1 })
        await next({ scale: [1, 1, 1], opacity: 0.6 })
      }
    },
    config: config.wobbly
  }))

  return (
    <animated.group
      position={[position.x, position.y + 0.05, position.z]}
      scale={springs.scale as any}
    >
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 16]} />
        <animated.meshStandardMaterial
          color="#ff4444"
          transparent
          opacity={springs.opacity}
          emissive="#ff4444"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 16]} />
        <animated.meshStandardMaterial
          color="#ff4444"
          transparent
          opacity={springs.opacity}
          emissive="#ff4444"
          emissiveIntensity={0.5}
        />
      </mesh>
    </animated.group>
  )
}