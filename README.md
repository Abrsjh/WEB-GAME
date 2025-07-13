# 3D Chess Game

A beautiful, interactive 3D chess game built with modern web technologies. Play chess in an immersive 3D environment with smooth animations, visual effects, and intuitive controls.

## 🎮 Features

- **3D Interactive Chess Board**: Fully rendered 3D chess board with realistic lighting and shadows
- **Complete Chess Gameplay**: Full chess rules implementation with move validation
- **Beautiful Animations**: Smooth piece movement, hover effects, and capture animations
- **Visual Feedback**: Highlighted moves, check indicators, and game status displays
- **Multiple Camera Views**: Switch between different viewing angles (White, Black, Top, Default)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Game Controls**: New game, undo moves, game history tracking

## 🚀 Tech Stack

- **React 18** - Frontend framework
- **Three.js** - 3D graphics rendering
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **React Spring** - Animations and transitions
- **Zustand** - State management
- **Chess.js** - Chess game logic and validation
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Vitest** - Testing framework

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 3d-chess-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎮 How to Play

1. **Select a Piece**: Click on any of your pieces (white starts first)
2. **View Possible Moves**: Valid moves will be highlighted in green
3. **Make a Move**: Click on a highlighted square to move your piece
4. **Camera Controls**: 
   - Use mouse wheel to zoom in/out
   - Drag to rotate the camera
   - Press 1-3 for preset camera angles
5. **Game Controls**: Use the control panel to start a new game or undo moves

### Keyboard Shortcuts

- `1` - White's perspective
- `2` - Black's perspective  
- `3` - Top-down view
- `0` - Default perspective
- `R` - Reset camera

## 🏗️ Architecture

The application follows a modular architecture with clear separation of concerns:

```
src/
├── components/          # React UI components
│   ├── GameStatus.tsx   # Game state display
│   └── GameControls.tsx # Game control buttons
├── three/              # 3D rendering components
│   ├── ChessScene.tsx   # Main 3D scene
│   ├── ChessBoard.tsx   # 3D chess board
│   ├── pieces/          # Chess piece components
│   ├── animations/      # Animation components
│   └── effects/         # Visual effects
├── store/              # State management
│   └── gameStore.ts     # Zustand game store
├── hooks/              # Custom React hooks
│   ├── usePieceSelection.ts
│   └── usePieceMovement.ts
├── utils/              # Utility functions
│   └── chessHelpers.ts  # Chess-related utilities
└── __tests__/          # Test files
```

## 🧪 Testing

The project includes comprehensive tests covering:

- Game logic and state management
- Chess utility functions
- UI component behavior
- 3D rendering components

Run tests:
```bash
npm run test
```

## 📱 Mobile Support

The game is fully responsive and optimized for mobile devices:

- Touch-friendly piece selection
- Pinch-to-zoom camera controls
- Adaptive UI layout
- Optimized performance for mobile browsers

## 🚀 Deployment

This project is configured for zero-configuration deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Deploy automatically with every push

The build is optimized for production with:
- Code splitting and tree shaking
- Asset compression and minification
- Lazy loading of non-critical resources

## 🎨 Customization

The game is built with customization in mind:

- **Piece Models**: Modify `src/three/pieces/PieceGeometry.tsx` to change piece designs
- **Board Appearance**: Customize colors and materials in `src/three/ChessBoard.tsx`
- **Animations**: Adjust timing and effects in `src/three/animations/`
- **Lighting**: Modify scene lighting in `src/three/ChessScene.tsx`

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Chess.js for the robust chess engine
- Three.js community for excellent 3D web graphics
- React Three Fiber team for the amazing React integration
- Vercel for seamless deployment platform