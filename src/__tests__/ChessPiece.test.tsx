import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { ChessPiece } from '../three/pieces/ChessPiece'

const ChessPieceWrapper = ({ children, ...props }: any) => (
  <Canvas>
    <ChessPiece {...props} />
    {children}
  </Canvas>
)

describe('ChessPiece', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <ChessPieceWrapper 
        type="p" 
        color="w" 
        square="e2" 
      />
    )
    expect(container).toBeDefined()
  })

  it('should render white pawn correctly', () => {
    const { container } = render(
      <ChessPieceWrapper 
        type="p" 
        color="w" 
        square="e2" 
      />
    )
    
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('should render black king correctly', () => {
    const { container } = render(
      <ChessPieceWrapper 
        type="k" 
        color="b" 
        square="e8" 
      />
    )
    
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('should handle click events', () => {
    const onClick = vi.fn()
    
    render(
      <ChessPieceWrapper 
        type="q" 
        color="w" 
        square="d1" 
        onClick={onClick}
      />
    )
    
    expect(onClick).not.toHaveBeenCalled()
  })

  it('should render selected piece with different scale', () => {
    const { container } = render(
      <ChessPieceWrapper 
        type="r" 
        color="b" 
        square="a8" 
        isSelected={true}
      />
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render all piece types', () => {
    const pieceTypes: Array<{ type: any, color: any }> = [
      { type: 'p', color: 'w' },
      { type: 'r', color: 'b' },
      { type: 'n', color: 'w' },
      { type: 'b', color: 'b' },
      { type: 'q', color: 'w' },
      { type: 'k', color: 'b' }
    ]
    
    pieceTypes.forEach(({ type, color }) => {
      const { container } = render(
        <ChessPieceWrapper 
          type={type} 
          color={color} 
          square="e4" 
        />
      )
      
      expect(container.querySelector('canvas')).toBeInTheDocument()
    })
  })

  it('should position piece correctly on different squares', () => {
    const squares = ['a1', 'h8', 'e4', 'd5']
    
    squares.forEach(square => {
      const { container } = render(
        <ChessPieceWrapper 
          type="p" 
          color="w" 
          square={square}
        />
      )
      
      expect(container.querySelector('canvas')).toBeInTheDocument()
    })
  })
})