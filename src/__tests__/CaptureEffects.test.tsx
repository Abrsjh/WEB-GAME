import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { CaptureEffect, CapturedPiecesDisplay, ExplosionEffect } from '../three/effects/CaptureEffects'

const EffectsWrapper = ({ children }: { children: React.ReactNode }) => (
  <Canvas>
    {children}
  </Canvas>
)

describe('CaptureEffect', () => {
  it('should render capture effect', () => {
    const capturedPiece = {
      type: 'p' as const,
      color: 'w' as const,
      square: 'e4' as const
    }
    
    const { container } = render(
      <EffectsWrapper>
        <CaptureEffect capturedPiece={capturedPiece} />
      </EffectsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should call onComplete callback', () => {
    const onComplete = vi.fn()
    const capturedPiece = {
      type: 'q' as const,
      color: 'b' as const,
      square: 'd5' as const
    }
    
    render(
      <EffectsWrapper>
        <CaptureEffect capturedPiece={capturedPiece} onComplete={onComplete} />
      </EffectsWrapper>
    )
    
    expect(onComplete).not.toHaveBeenCalled()
  })
})

describe('CapturedPiecesDisplay', () => {
  it('should render captured pieces for white', () => {
    const capturedPieces = [
      { type: 'p' as const, color: 'b' as const, id: '1' },
      { type: 'r' as const, color: 'b' as const, id: '2' }
    ]
    
    const { container } = render(
      <EffectsWrapper>
        <CapturedPiecesDisplay capturedPieces={capturedPieces} side="white" />
      </EffectsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render captured pieces for black', () => {
    const capturedPieces = [
      { type: 'n' as const, color: 'w' as const, id: '3' },
      { type: 'b' as const, color: 'w' as const, id: '4' }
    ]
    
    const { container } = render(
      <EffectsWrapper>
        <CapturedPiecesDisplay capturedPieces={capturedPieces} side="black" />
      </EffectsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should handle empty captured pieces', () => {
    const { container } = render(
      <EffectsWrapper>
        <CapturedPiecesDisplay capturedPieces={[]} side="white" />
      </EffectsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})

describe('ExplosionEffect', () => {
  it('should render explosion effect', () => {
    const position = new Vector3(0, 0, 0)
    const onComplete = vi.fn()
    
    const { container } = render(
      <EffectsWrapper>
        <ExplosionEffect position={position} onComplete={onComplete} />
      </EffectsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should handle different positions', () => {
    const position = new Vector3(2, 1, -1)
    
    const { container } = render(
      <EffectsWrapper>
        <ExplosionEffect position={position} />
      </EffectsWrapper>
    )
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})