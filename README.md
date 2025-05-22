# Waterfall Demo

A React-based application for managing and editing rules with a backend API.

## Features

- Rule management interface
- HEIC image conversion
- RESTful API backend
- Modern Material-UI interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Waterfall_Demo
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
./start-backend.sh
```

2. Start the frontend development server:
```bash
./start-rule-editor.sh
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Project Structure

- `/src` - Frontend React application source code
- `/public` - Static assets
- `rule-editor-server.js` - Backend API server
- `start-backend.sh` - Script to start the backend server
- `start-rule-editor.sh` - Script to start the frontend development server

## API Endpoints

- `GET /api/rule-sets` - Get all rule sets
- `GET /api/ruleset/:id` - Get rules for a specific rule set
- `POST /api/ruleset` - Create a new rule
- `PUT /api/ruleset/:id` - Update a rule
- `DELETE /api/ruleset/:id` - Delete a rule

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
