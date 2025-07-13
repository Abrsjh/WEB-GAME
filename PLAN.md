# PLAN.md - 3D Web Chess Game Implementation

## Phase 1: Project Initialization

- [ ] **Prompt**: "Initialize a new Vite project with React and TypeScript in the current directory. Use `npm create vite@latest . -- --template react-ts` and configure it for zero-config Vercel deployment."

- [ ] **Prompt**: "Install the core dependencies: `npm install three @types/three @react-three/fiber @react-three/drei zustand chess.js`. Also install dev dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`."

- [ ] **Prompt**: "Configure Vitest for testing by updating vite.config.ts to include test configuration and create a test setup file at src/test/setup.ts with React Testing Library configuration."

- [ ] **Prompt**: "Update the default Vite project structure: remove src/App.css, src/index.css content, and replace src/App.tsx with a basic 'Chess Game' header component."

- [ ] **Prompt**: "Create the folder structure: src/components/, src/three/, src/store/, src/utils/, src/hooks/, src/__tests__/. Add index.ts barrel exports for each folder."

## Phase 2: State Management & Chess Logic

- [ ] **Prompt**: "In src/store/gameStore.ts, create a Zustand store with TypeScript for chess game state. Include: current game position (FEN), selected square, possible moves, game status, move history, and current player turn."

- [ ] **Prompt**: "Write failing tests in src/__tests__/gameStore.test.ts for the game store: initial state, piece selection, move execution, and turn switching. Follow TDD - write tests first."

- [ ] **Prompt**: "Implement the game store logic to make the tests pass. Integrate chess.js for move validation, game state updates, and legal move generation."

- [ ] **Prompt**: "In src/utils/chessHelpers.ts, create utility functions for converting between chess.js coordinates and 3D world coordinates, and for determining piece types from FEN notation."

## Phase 3: Basic 3D Scene Setup

- [ ] **Prompt**: "Create src/three/ChessScene.tsx as a React Three Fiber Canvas component with basic scene setup: camera positioning, lighting (ambient + directional), and orbit controls from @react-three/drei."

- [ ] **Prompt**: "Write tests in src/__tests__/ChessScene.test.ts for the ChessScene component rendering and basic camera setup."

- [ ] **Prompt**: "In src/three/ChessBoard.tsx, create a 3D chess board component with 64 alternating colored squares (8x8 grid). Use Three.js PlaneGeometry and materials for light and dark squares."

- [ ] **Prompt**: "Add tests for ChessBoard component in src/__tests__/ChessBoard.test.ts to verify correct number of squares and alternating colors."

## Phase 4: Chess Pieces 3D Models

- [ ] **Prompt**: "Create src/three/pieces/PieceGeometry.ts with basic geometric shapes for chess pieces using Three.js primitives: Pawn (cylinder + sphere), Rook (box), Knight (box with cone), Bishop (cylinder + cone), Queen (cylinder + multiple cones), King (cylinder + cross)."

- [ ] **Prompt**: "In src/three/pieces/ChessPiece.tsx, create a reusable component that renders different piece types with appropriate materials (white/black) and positioning on the board."

- [ ] **Prompt**: "Write tests in src/__tests__/ChessPiece.test.ts for piece rendering, material colors, and position calculations."

- [ ] **Prompt**: "Create src/three/pieces/PieceSet.tsx that renders all chess pieces in their starting positions using the game store state and piece geometry components."

## Phase 5: User Interaction System

- [ ] **Prompt**: "Implement piece selection in src/hooks/usePieceSelection.ts: handle mouse clicks on pieces, highlight selected piece, show possible moves as colored overlays on valid squares."

- [ ] **Prompt**: "Write tests for usePieceSelection hook in src/__tests__/usePieceSelection.test.ts covering piece selection, deselection, and move highlighting."

- [ ] **Prompt**: "In src/hooks/usePieceMovement.ts, implement drag-and-drop movement: handle mouse down/move/up events, piece dragging animation, and move execution on valid drop targets."

- [ ] **Prompt**: "Add comprehensive tests for piece movement in src/__tests__/usePieceMovement.test.ts including valid moves, invalid moves, and animation states."

## Phase 6: Game Flow Integration

- [ ] **Prompt**: "Create src/components/GameStatus.tsx React component that displays current game status: whose turn, check/checkmate alerts, move history, and game outcome messages."

- [ ] **Prompt**: "Implement src/components/GameControls.tsx with buttons for: new game, undo move, reset board, and toggle board rotation. Connect to game store actions."

- [ ] **Prompt**: "Write tests for GameStatus and GameControls components in src/__tests__/GameUI.test.ts verifying UI updates with game state changes."

- [ ] **Prompt**: "In src/App.tsx, integrate all components: ChessScene with ChessBoard and PieceSet, GameStatus, and GameControls. Ensure responsive layout for different screen sizes."

## Phase 7: Visual Polish & Effects

- [ ] **Prompt**: "Add move animations in src/three/animations/PieceAnimations.ts using React Three Fiber's useSpring for smooth piece movement between squares."

- [ ] **Prompt**: "Implement piece capture effects in src/three/effects/CaptureEffects.tsx: fade out captured pieces and animate them moving off the board."

- [ ] **Prompt**: "Create board highlighting system in src/three/effects/BoardHighlights.tsx for selected square, possible moves, last move, and check indicator."

- [ ] **Prompt**: "Add camera controls enhancement in src/three/CameraControls.tsx: smooth board rotation, zoom limits, and preset viewing angles."

## Phase 8: Testing & Optimization

- [ ] **Prompt**: "Run complete test suite with `npm run test` and ensure all tests pass. Fix any failing tests and achieve >90% code coverage."

- [ ] **Prompt**: "Perform performance optimization: implement React.memo for chess pieces, useMemo for expensive calculations, and Three.js geometry instancing for repeated elements."

- [ ] **Prompt**: "Test responsive design on mobile devices: ensure touch interactions work, adjust camera controls for mobile, and optimize UI for small screens."

- [ ] **Prompt**: "Build production version with `npm run build` and test locally. Verify bundle size is reasonable and all assets load correctly."

## Phase 9: Deployment & Final Verification

- [ ] **Prompt**: "Deploy to Vercel: push code to GitHub repository and connect to Vercel. Verify zero-configuration deployment works correctly."

- [ ] **Prompt**: "Perform end-to-end testing on deployed version: test full chess game from start to finish, verify all moves work correctly, and confirm responsive design."

- [ ] **Prompt**: "Create final documentation in README.md with project description, setup instructions, tech stack details, and deployment information."

- [ ] **Prompt**: "Run final verification: play a complete chess game, test all interactive features, and confirm the application meets all requirements from CLAUDE.md."