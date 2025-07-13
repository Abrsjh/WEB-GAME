import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

export function GameControls() {
  const { 
    resetGame, 
    undoMove, 
    moveHistory, 
    gameStatus 
  } = useGameStore()

  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const handleNewGame = () => {
    if (moveHistory.length > 0) {
      setShowConfirmReset(true)
    } else {
      resetGame()
    }
  }

  const confirmNewGame = () => {
    resetGame()
    setShowConfirmReset(false)
  }

  const cancelNewGame = () => {
    setShowConfirmReset(false)
  }

  const handleUndo = () => {
    undoMove()
  }

  const isGameOver = gameStatus === 'checkmate' || gameStatus === 'stalemate' || gameStatus === 'draw'
  const canUndo = moveHistory.length > 0 && !isGameOver

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{
        margin: '0 0 1rem 0',
        color: '#343a40',
        fontSize: '1.2rem'
      }}>
        Game Controls
      </h3>

      {showConfirmReset && (
        <div style={{
          marginBottom: '1rem',
          padding: '1rem',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          color: '#856404'
        }}>
          <div style={{ marginBottom: '0.75rem', fontWeight: 'bold' }}>
            Start a new game?
          </div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}>
            This will reset the current game and lose all progress.
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={confirmNewGame}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}
            >
              Yes, Reset
            </button>
            <button
              onClick={cancelNewGame}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={handleNewGame}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          🔄 New Game
        </button>

        <button
          onClick={handleUndo}
          disabled={!canUndo}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: canUndo ? '#28a745' : '#e9ecef',
            color: canUndo ? 'white' : '#6c757d',
            border: 'none',
            borderRadius: '6px',
            cursor: canUndo ? 'pointer' : 'not-allowed',
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: canUndo ? 1 : 0.6
          }}
        >
          ↶ Undo Move
        </button>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#495057'
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>Controls:</strong>
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>Click a piece to select it and see possible moves</li>
          <li>Click a highlighted square to move the selected piece</li>
          <li>Click elsewhere to deselect</li>
          <li>Use mouse wheel or pinch to zoom the 3D board</li>
          <li>Drag to rotate the camera view</li>
        </ul>
      </div>

      {isGameOver && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          color: '#155724',
          textAlign: 'center'
        }}>
          <strong>Game Complete!</strong> Start a new game to play again.
        </div>
      )}
    </div>
  )
}