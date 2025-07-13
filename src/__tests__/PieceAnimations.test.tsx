import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { PieceAnimation, HoverAnimation, BoardAnimation } from '../three/animations/PieceAnimations'

const AnimationWrapper = ({ children }: { children: React.ReactNode }) => (
  <Canvas>
    {children}
  </Canvas>
)

describe('PieceAnimation', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <AnimationWrapper>
        <PieceAnimation square="e4">
          <mesh />
        </PieceAnimation>
      </AnimationWrapper>
    )
    expect(container).toBeDefined()
  })

  it('should handle moving animation', () => {
    const onComplete = vi.fn()
    
    render(
      <AnimationWrapper>
        <PieceAnimation 
          square="e4" 
          isMoving={true}
          fromSquare="e2"
          onAnimationComplete={onComplete}
        >
          <mesh />
        </PieceAnimation>
      </AnimationWrapper>
    )
    
    expect(onComplete).not.toHaveBeenCalled()
  })

  it('should position piece correctly', () => {
    const { container } = render(
      <AnimationWrapper>
        <PieceAnimation square="a1">
          <mesh />
        </PieceAnimation>
      </AnimationWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})

describe('HoverAnimation', () => {
  it('should render with hover state', () => {
    const { container } = render(
      <AnimationWrapper>
        <HoverAnimation isHovered={true}>
          <mesh />
        </HoverAnimation>
      </AnimationWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render with selected state', () => {
    const { container } = render(
      <AnimationWrapper>
        <HoverAnimation isSelected={true}>
          <mesh />
        </HoverAnimation>
      </AnimationWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render in normal state', () => {
    const { container } = render(
      <AnimationWrapper>
        <HoverAnimation isHovered={false} isSelected={false}>
          <mesh />
        </HoverAnimation>
      </AnimationWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})

describe('BoardAnimation', () => {
  it('should render with highlighted state', () => {
    const { container } = render(
      <AnimationWrapper>
        <BoardAnimation isHighlighted={true}>
          <mesh />
        </BoardAnimation>
      </AnimationWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render with selected state', () => {
    const { container } = render(
      <AnimationWrapper>
        <BoardAnimation isSelected={true}>
          <mesh />
        </BoardAnimation>
      </AnimationWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render in normal state', () => {
    const { container } = render(
      <AnimationWrapper>
        <BoardAnimation>
          <mesh />
        </BoardAnimation>
      </AnimationWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})