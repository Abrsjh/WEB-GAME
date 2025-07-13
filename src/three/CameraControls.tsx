import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'

interface EnhancedCameraControlsProps {
  autoRotate?: boolean
  autoRotateSpeed?: number
  enableKeyboardControls?: boolean
}

export function EnhancedCameraControls({
  autoRotate = false,
  autoRotateSpeed = 0.5,
  enableKeyboardControls = true
}: EnhancedCameraControlsProps) {
  const controlsRef = useRef<any>(null)
  const [cameraPreset, setCameraPreset] = useState<'default' | 'white' | 'black' | 'top'>('default')

  const presetPositions = {
    default: new Vector3(8, 8, 8),
    white: new Vector3(0, 6, 8),
    black: new Vector3(0, 6, -8),
    top: new Vector3(0, 12, 0)
  }

  const smoothTransitionToPreset = (preset: keyof typeof presetPositions) => {
    if (!controlsRef.current) return
    
    const targetPosition = presetPositions[preset]
    const controls = controlsRef.current
    
    const startPosition = controls.object.position.clone()
    const duration = 1000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

      const easedProgress = easeInOutCubic(progress)
      
      controls.object.position.lerpVectors(startPosition, targetPosition, easedProgress)
      controls.update()

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
    setCameraPreset(preset)
  }

  useFrame(() => {
    if (controlsRef.current && enableKeyboardControls) {
      const controls = controlsRef.current
      
      // Handle keyboard shortcuts
      document.addEventListener('keydown', (event) => {
        switch (event.key) {
          case '1':
            smoothTransitionToPreset('white')
            break
          case '2':
            smoothTransitionToPreset('black')
            break
          case '3':
            smoothTransitionToPreset('top')
            break
          case '0':
            smoothTransitionToPreset('default')
            break
          case 'r':
            controls.reset()
            break
        }
      })
    }
  })

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        minDistance={3}
        maxDistance={25}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0, 0]}
        dampingFactor={0.05}
        enableDamping={true}
        rotateSpeed={0.8}
        zoomSpeed={0.8}
        panSpeed={0.8}
        touches={{
          ONE: 2, // Rotate
          TWO: 1  // Zoom
        }}
      />
      
      <CameraControls onPresetChange={smoothTransitionToPreset} currentPreset={cameraPreset} />
    </>
  )
}

interface CameraControlsProps {
  onPresetChange: (preset: 'default' | 'white' | 'black' | 'top') => void
  currentPreset: string
}

function CameraControls({ onPresetChange, currentPreset }: CameraControlsProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      zIndex: 1000
    }}>
      <button
        onClick={() => onPresetChange('white')}
        style={{
          padding: '8px 12px',
          backgroundColor: currentPreset === 'white' ? '#007bff' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
        title="White's view (Key: 1)"
      >
        White
      </button>
      
      <button
        onClick={() => onPresetChange('black')}
        style={{
          padding: '8px 12px',
          backgroundColor: currentPreset === 'black' ? '#007bff' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
        title="Black's view (Key: 2)"
      >
        Black
      </button>
      
      <button
        onClick={() => onPresetChange('top')}
        style={{
          padding: '8px 12px',
          backgroundColor: currentPreset === 'top' ? '#007bff' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
        title="Top view (Key: 3)"
      >
        Top
      </button>
      
      <button
        onClick={() => onPresetChange('default')}
        style={{
          padding: '8px 12px',
          backgroundColor: currentPreset === 'default' ? '#007bff' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
        title="Default view (Key: 0)"
      >
        Default
      </button>
    </div>
  )
}