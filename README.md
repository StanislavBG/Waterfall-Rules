# Waterfall Rules Editor

A React-based rule editor that allows you to create, edit, and manage hierarchical rules with support for nested structures and OR operators.

## Features

- Create and manage hierarchical rules
- Support for nested rule structures
- OR operator between rules
- Visual hierarchy to show rule relationships
- Edit rule descriptions
- Move rules up/down
- Nest/Un-nest rules
- Reset to original ruleset

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 8.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/StanislavBG/Waterfall-Rules.git
cd Waterfall-Rules
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
# Start the backend server
./start-backend.sh

# In a new terminal, start the frontend
./start-rule-editor.sh
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Development

- Frontend: React with TypeScript
- Backend: Node.js with Express
- UI: Material-UI (MUI)
- Animations: Framer Motion

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── types/            # TypeScript type definitions
│   └── App.tsx           # Main application component
├── .github/              # GitHub Actions workflows
├── public/               # Static files
└── rule-editor-server.js # Backend server
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
