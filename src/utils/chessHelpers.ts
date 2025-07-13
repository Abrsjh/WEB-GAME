import { Square, PieceSymbol, Color } from 'chess.js'

export interface Position3D {
  x: number
  y: number
  z: number
}

export interface BoardCoordinates {
  file: number // 0-7 (a-h)
  rank: number // 0-7 (1-8)
}

export const BOARD_SIZE = 8
export const SQUARE_SIZE = 1

export function squareToCoordinates(square: Square): BoardCoordinates {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0)
  const rank = parseInt(square[1]) - 1
  return { file, rank }
}

export function coordinatesToSquare(file: number, rank: number): Square {
  const fileChar = String.fromCharCode('a'.charCodeAt(0) + file)
  const rankNum = (rank + 1).toString()
  return (fileChar + rankNum) as Square
}

export function squareTo3DPosition(square: Square): Position3D {
  const { file, rank } = squareToCoordinates(square)
  return {
    x: (file - 3.5) * SQUARE_SIZE,
    y: 0,
    z: (rank - 3.5) * SQUARE_SIZE
  }
}

export function position3DToSquare(position: Position3D): Square | null {
  const file = Math.round(position.x / SQUARE_SIZE + 3.5)
  const rank = Math.round(position.z / SQUARE_SIZE + 3.5)
  
  if (file >= 0 && file < 8 && rank >= 0 && rank < 8) {
    return coordinatesToSquare(file, rank)
  }
  return null
}

export function isLightSquare(square: Square): boolean {
  const { file, rank } = squareToCoordinates(square)
  return (file + rank) % 2 === 0
}

export function isDarkSquare(square: Square): boolean {
  return !isLightSquare(square)
}

export function getPieceTypeFromSymbol(symbol: PieceSymbol): string {
  const pieces: Record<PieceSymbol, string> = {
    'p': 'pawn',
    'r': 'rook',
    'n': 'knight',
    'b': 'bishop',
    'q': 'queen',
    'k': 'king'
  }
  return pieces[symbol.toLowerCase() as PieceSymbol] || 'unknown'
}

export function getColorFromPiece(color: Color): 'white' | 'black' {
  return color === 'w' ? 'white' : 'black'
}

export function getAllSquares(): Square[] {
  const squares: Square[] = []
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      squares.push(coordinatesToSquare(file, rank))
    }
  }
  return squares
}

export function isValidSquare(square: string): square is Square {
  return /^[a-h][1-8]$/.test(square)
}

export function getSquareColor(square: Square): 'light' | 'dark' {
  return isLightSquare(square) ? 'light' : 'dark'
}