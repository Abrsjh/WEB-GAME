import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { ChessBoard } from './ChessBoard'
import { PieceSet } from './pieces'
import { EnhancedCameraControls } from './CameraControls'
import { usePieceSelection } from '../hooks'

export function ChessScene() {
  const {
    selectedSquare,
    highlightedSquares,
    handleSquareClick,
    handlePieceClick
  } = usePieceSelection()

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Canvas
        camera={{
          position: [8, 8, 8],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        shadows
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#f0f0f0']} />
        
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
          shadow-bias={-0.0001}
        />
        
        <pointLight
          position={[-10, 8, -10]}
          intensity={0.5}
          color="#ffffff"
        />
        
        <Environment preset="studio" />
        
        <fog attach="fog" args={['#f0f0f0', 20, 40]} />
        
        <ChessBoard 
          selectedSquare={selectedSquare}
          highlightedSquares={highlightedSquares}
          onSquareClick={handleSquareClick}
        />
        
        <PieceSet onPieceClick={handlePieceClick} />
        
        <EnhancedCameraControls 
          autoRotate={false}
          enableKeyboardControls={true}
        />
      </Canvas>
    </div>
  )
}