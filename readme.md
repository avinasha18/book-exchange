# Book Exchange Platform

A web application that allows users to list books they want to exchange and find matches with other users who have books they're interested in.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- Book listing and management
- Book discovery with filtering options
- Exchange request system
- Matchmaking based on user preferences

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)

### Installation

1. Clone the repository:
git clone https://github.com/yourusername/book-exchange-platform.git
cd book-exchange-platform
Copy
2. Install backend dependencies:
npm install
Copy
3. Install frontend dependencies:
cd frontend
npm install
Copy
## Configuration

1. Create a `.env` file in the root directory with the following content:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Copy
Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret_key` with a secure random string.

2. (Optional) Adjust other configuration settings in `backend/config/default.json` if needed.

## Running the Application

1. Start the backend server:
npm run server
Copy
2. In a new terminal, start the frontend development server:
cd frontend
npm start
Copy
3. Open your browser and navigate to `http://localhost:3000` to use the application.

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/user`: Get current user info
- `POST /api/books`: Add a new book
- `GET /api/books`: Get all available books
- `GET /api/books/user`: Get current user's books
- `PUT /api/books/:id`: Update a book
- `DELETE /api/books/:id`: Delete a book
- `POST /api/exchanges`: Request a book exchange
- `GET /api/exchanges`: Get user's exchanges
- `PUT /api/exchanges/:id`: Respond to an exchange request

## Deployment

To deploy the application:

1. Set up a MongoDB database (e.g., using MongoDB Atlas).
2. Deploy the backend to a Node.js hosting platform (e.g., Heroku, DigitalOcean).
3. Build the React frontend:
cd frontend
npm run build
Copy4. Deploy the built frontend to a static hosting service (e.g., Netlify, Vercel).
5. Set the necessary environment variables on your hosting platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.