import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { 
  BoardHighlight, 
  PossibleMoveIndicator, 
  LastMoveHighlight, 
  CheckIndicator 
} from '../three/effects/BoardHighlights'

const HighlightsWrapper = ({ children }: { children: React.ReactNode }) => (
  <Canvas>
    {children}
  </Canvas>
)

describe('BoardHighlight', () => {
  it('should render selected highlight', () => {
    const { container } = render(
      <HighlightsWrapper>
        <BoardHighlight square="e4" type="selected" />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render possible move highlight', () => {
    const { container } = render(
      <HighlightsWrapper>
        <BoardHighlight square="e5" type="possible-move" />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render check highlight', () => {
    const { container } = render(
      <HighlightsWrapper>
        <BoardHighlight square="e1" type="check" />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render with custom intensity', () => {
    const { container } = render(
      <HighlightsWrapper>
        <BoardHighlight square="d4" type="selected" intensity={0.5} />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})

describe('PossibleMoveIndicator', () => {
  it('should render move indicator', () => {
    const { container } = render(
      <HighlightsWrapper>
        <PossibleMoveIndicator square="f5" />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render capture indicator', () => {
    const { container } = render(
      <HighlightsWrapper>
        <PossibleMoveIndicator square="g6" isCapture={true} />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})

describe('LastMoveHighlight', () => {
  it('should render last move highlight', () => {
    const { container } = render(
      <HighlightsWrapper>
        <LastMoveHighlight fromSquare="e2" toSquare="e4" />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should handle different squares', () => {
    const { container } = render(
      <HighlightsWrapper>
        <LastMoveHighlight fromSquare="g1" toSquare="f3" />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})

describe('CheckIndicator', () => {
  it('should render check indicator', () => {
    const { container } = render(
      <HighlightsWrapper>
        <CheckIndicator kingSquare="e1" />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should handle different king positions', () => {
    const { container } = render(
      <HighlightsWrapper>
        <CheckIndicator kingSquare="e8" />
      </HighlightsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})