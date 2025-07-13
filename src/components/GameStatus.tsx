import { memo, useMemo } from 'react'
import { useGameStore } from '../store/gameStore'

export const GameStatus = memo(function GameStatus() {
  const { 
    gameStatus, 
    currentPlayer, 
    moveHistory
  } = useGameStore()

  const gameInfo = useMemo(() => {
    const getCurrentPlayerName = () => {
      return currentPlayer === 'w' ? 'White' : 'Black'
    }

    const getStatusMessage = () => {
      switch (gameStatus) {
        case 'check':
          return `${getCurrentPlayerName()} is in check!`
        case 'checkmate':
          const winner = currentPlayer === 'w' ? 'Black' : 'White'
          return `Checkmate! ${winner} wins!`
        case 'stalemate':
          return 'Stalemate! The game is a draw.'
        case 'draw':
          return 'Draw! The game has ended in a draw.'
        case 'playing':
        default:
          return `${getCurrentPlayerName()}'s turn`
      }
    }

    const getStatusColor = () => {
      switch (gameStatus) {
        case 'check':
          return '#ff6b6b'
        case 'checkmate':
          return '#e74c3c'
        case 'stalemate':
        case 'draw':
          return '#f39c12'
        case 'playing':
        default:
          return '#2ecc71'
      }
    }

    const getMoveCount = () => {
      return Math.floor(moveHistory.length / 2) + 1
    }

    const getLastMove = () => {
      if (moveHistory.length === 0) return null
      const lastMove = moveHistory[moveHistory.length - 1]
      return `${lastMove.piece.toUpperCase()}${lastMove.from}-${lastMove.to}`
    }

    return {
      currentPlayerName: getCurrentPlayerName(),
      statusMessage: getStatusMessage(),
      statusColor: getStatusColor(),
      moveCount: getMoveCount(),
      lastMove: getLastMove()
    }
  }, [gameStatus, currentPlayer, moveHistory])

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      marginBottom: '1rem',
      border: '1px solid #dee2e6'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem'
      }}>
        <h3 style={{
          margin: 0,
          color: '#343a40',
          fontSize: '1.2rem'
        }}>
          Game Status
        </h3>
        <div style={{
          backgroundColor: gameInfo.statusColor,
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '16px',
          fontSize: '0.875rem',
          fontWeight: 'bold'
        }}>
          {gameInfo.statusMessage}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.875rem', color: '#6c757d', marginBottom: '0.25rem' }}>
            Current Turn
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#495057' }}>
            {gameInfo.currentPlayerName}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.875rem', color: '#6c757d', marginBottom: '0.25rem' }}>
            Move Number
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#495057' }}>
            {gameInfo.moveCount}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.875rem', color: '#6c757d', marginBottom: '0.25rem' }}>
            Last Move
          </div>
          <div style={{ 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            color: '#495057',
            fontFamily: 'monospace'
          }}>
            {gameInfo.lastMove || 'None'}
          </div>
        </div>
      </div>

      {gameStatus === 'check' && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          color: '#856404'
        }}>
          <strong>Check!</strong> The {gameInfo.currentPlayerName.toLowerCase()} king is under attack.
        </div>
      )}

      {(gameStatus === 'checkmate' || gameStatus === 'stalemate' || gameStatus === 'draw') && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: gameStatus === 'checkmate' ? '#f8d7da' : '#d1ecf1',
          border: `1px solid ${gameStatus === 'checkmate' ? '#f5c6cb' : '#bee5eb'}`,
          borderRadius: '4px',
          color: gameStatus === 'checkmate' ? '#721c24' : '#0c5460'
        }}>
          <strong>Game Over!</strong> {gameInfo.statusMessage}
        </div>
      )}
    </div>
  )
})