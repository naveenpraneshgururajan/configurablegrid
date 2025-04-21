# Configurable Grid Heatmap Generator

A full-stack application with a React frontend and FastAPI backend that demonstrates a configurable grid system.

## Overview

This project consists of two main components:

- **Frontend**: A React application for displaying and the heatmap for different types of Data
- **Backend**: A Python FastAPI service that provides data and configuration required for the grid system

## Project Structure

```
configurable-grid-demo/
├── frontend/             # React application
│   ├── public/           # Static files
│   ├── src/              # React source code
│   ├── package.json      # Frontend dependencies
│   └── ...
├── backend/              # FastAPI service
│   ├── requirements.txt  # Python dependencies
│   ├── main.py           # FastAPI entry point
│   └── ...
└── README.md             # This file
```

## Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

## Installation

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# For Mac, run using pip3 command
pip3 install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

The backend API will be available at [http://localhost:8000](http://localhost:8000).
API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

## Technologies Used

### Frontend

- React 18
- React Router DOM
- Jest for testing

### Backend

- FastAPI
- Uvicorn as ASGI server
- python-dotenv for environment variable management

## Development

### Environment Variables

Create a `.env` file if necessary. For this project no env variables were used or created.

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
pytest -v
```

#### Run specific test file:

```bash
pytest test_main.py
```

### Frontend Coverage Tests

```bash
cd frontend
npm run coverage

#Displays the overall coverage for the application
```

## Deployment

### Building for Production

```bash
# Frontend build
cd frontend
npm run build

# The build artifacts will be stored in the frontend/build/ directory
```

Package the backend according to your hosting requirements.

## License

[MIT License](LICENSE)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
