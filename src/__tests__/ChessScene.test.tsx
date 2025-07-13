import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ChessScene } from '../three/ChessScene'

describe('ChessScene', () => {
  it('should render without crashing', () => {
    const { container } = render(<ChessScene />)
    expect(container).toBeDefined()
  })

  it('should have correct container dimensions', () => {
    const { container } = render(<ChessScene />)
    const sceneContainer = container.firstChild as HTMLElement
    
    expect(sceneContainer).toHaveStyle('width: 100%')
    expect(sceneContainer).toHaveStyle('height: 600px')
  })

  it('should contain a canvas element', () => {
    const { container } = render(<ChessScene />)
    const canvas = container.querySelector('canvas')
    
    expect(canvas).toBeInTheDocument()
  })

  it('should render scene with proper setup', () => {
    const { container } = render(<ChessScene />)
    const canvas = container.querySelector('canvas')
    
    expect(canvas).toHaveAttribute('data-engine', expect.any(String))
  })
})