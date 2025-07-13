# System Patterns

## Architecture
- **Component-Based Architecture**: React components for UI elements
- **Scene-Based 3D Architecture**: Three.js scene graph for 3D chess board and pieces
- **State Management Pattern**: Zustand store for centralized game state

## Design Patterns

### Game State Management
- **Single Source of Truth**: Zustand store manages all game state
- **Immutable Updates**: State updates follow immutable patterns
- **Chess Logic Separation**: Chess.js handles game rules, validation, and move generation

### 3D Rendering
- **Scene Graph Pattern**: Hierarchical organization of 3D objects
- **Component Composition**: Reusable 3D components for chess pieces and board
- **Event-Driven Interactions**: Mouse/touch events for piece selection and movement

### Testing Strategy
- **Test-Driven Development**: Write tests before implementation
- **Component Testing**: Individual React component tests
- **Game Logic Testing**: Chess move validation and game state tests
- **Integration Testing**: End-to-end game flow tests

## File Structure
```
src/
├── components/        # React UI components
├── three/            # Three.js 3D components and scenes
├── store/            # Zustand state management
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
└── __tests__/        # Test files
```