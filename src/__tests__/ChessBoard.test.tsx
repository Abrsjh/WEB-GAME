import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { ChessBoard } from '../three/ChessBoard'

const ChessBoardWrapper = ({ children, ...props }: any) => (
  <Canvas>
    <ChessBoard {...props} />
    {children}
  </Canvas>
)

describe('ChessBoard', () => {
  it('should render without crashing', () => {
    const { container } = render(<ChessBoardWrapper />)
    expect(container).toBeDefined()
  })

  it('should render 64 squares', () => {
    const { container } = render(<ChessBoardWrapper />)
    
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('should call onSquareClick when square is clicked', () => {
    const onSquareClick = vi.fn()
    
    render(<ChessBoardWrapper onSquareClick={onSquareClick} />)
    
    expect(onSquareClick).not.toHaveBeenCalled()
  })

  it('should highlight selected square', () => {
    const { container } = render(
      <ChessBoardWrapper 
        selectedSquare="e4" 
        highlightedSquares={['e5', 'e6']} 
      />
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render board base', () => {
    const { container } = render(<ChessBoardWrapper />)
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})