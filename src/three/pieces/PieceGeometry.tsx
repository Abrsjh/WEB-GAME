export function PawnGeometry() {
  return (
    <group>
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}

export function RookGeometry() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.4, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.35, 0.1, 0.35]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0.12, 0.55, 0.12]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[-0.12, 0.55, 0.12]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0.12, 0.55, -0.12]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[-0.12, 0.55, -0.12]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}

export function KnightGeometry() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.4, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.45, 0.05]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.25, 0.35, 0.15]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.6, 0.15]} rotation={[0.5, 0, 0]} castShadow>
        <coneGeometry args={[0.08, 0.2, 6]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}

export function BishopGeometry() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.4, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 0.3, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.65, 0]} castShadow>
        <coneGeometry args={[0.08, 0.25, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.05, 6, 4]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}

export function QueenGeometry() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.4, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.3, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.2, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <coneGeometry args={[0.06, 0.15, 6]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0.08, 0.85, 0]} castShadow>
        <coneGeometry args={[0.03, 0.1, 4]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[-0.08, 0.85, 0]} castShadow>
        <coneGeometry args={[0.03, 0.1, 4]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.85, 0.08]} castShadow>
        <coneGeometry args={[0.03, 0.1, 4]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.85, -0.08]} castShadow>
        <coneGeometry args={[0.03, 0.1, 4]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}

export function KingGeometry() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.4, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.3, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.2, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.03]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.03, 0.15, 0.03]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}