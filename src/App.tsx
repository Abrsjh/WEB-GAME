import { useState, useEffect } from 'react'
import { ChessScene } from './three'
import { GameStatus, GameControls } from './components'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: isMobile ? '0.5rem' : '1rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '1rem',
          color: '#343a40',
          fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 'bold'
        }}>
          3D Chess Game
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 350px',
          gap: '1rem',
          alignItems: 'start'
        }}>
          <div>
            <ChessScene />
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: '1rem',
            overflow: isMobile ? 'auto' : 'visible'
          }}>
            <div style={{ 
              flex: isMobile ? '1' : 'auto',
              minWidth: isMobile ? '280px' : 'auto'
            }}>
              <GameStatus />
            </div>
            <div style={{ 
              flex: isMobile ? '1' : 'auto',
              minWidth: isMobile ? '280px' : 'auto'
            }}>
              <GameControls />
            </div>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          color: '#6c757d',
          fontSize: '0.875rem'
        }}>
          <p>A 3D chess game built with React, Three.js, and Chess.js</p>
          <p>
            {isMobile 
              ? 'Tap pieces to select, tap highlighted squares to move. Pinch to zoom, drag to rotate.'
              : 'Click pieces to select, click highlighted squares to move. Use camera controls (1-3) for different views.'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default App