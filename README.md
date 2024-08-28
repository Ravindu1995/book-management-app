# Book Management Application

## Overview

This is a full-stack book management application built with Node.js, Express, MongoDB, and React. It allows users to manage a collection of books with functionalities for adding, editing, deleting, and listing books.

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- Docker (version 4.33.1 or later)
- Docker Compose (included with Docker Desktop)

### Installation

#### Backend

1. Navigate to the `backend` directory:

    cd backend

2. Install the backend dependencies:

    npm install

3. Run the backend server locally:

    npm run dev

#### Frontend

1. Navigate to the `frontend` directory:

    cd frontend

2. Install the frontend dependencies:

    npm install

3. Run the frontend application locally:

    npm start

### Running with Docker and Docker Compose

To run the application using Docker and Docker Compose:

1. Ensure Docker Desktop is running.

2. Build and start all services (frontend, backend, and MongoDB):

    docker-compose up --build

    This command will:
    - Build the Docker images for the frontend and backend.
    - Start the frontend, backend, and MongoDB containers.
    - Expose the frontend on port 80 and the backend on port 5000.

3. Access the frontend application in your web browser at `http://localhost`.

4. To stop and remove the Docker containers, use:

    docker-compose down

### Environment Variables

The following environment variables are used in the Docker Compose configuration. You can also add them to a `.env` file for local development:

- `JWT_SECRET`: Secret key used for JWT authentication.
- `MONGO_URI`: Connection URI for the MongoDB database.

### File Structure

- `backend/`: Contains the backend code and Dockerfile.
- `frontend/`: Contains the frontend code and Dockerfile.
- `docker-compose.yml`: Defines the Docker services and configurations.
- `.env`: Contains environment variables (not included in the repository for security reasons).


