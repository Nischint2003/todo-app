# Todo Application

A simple Todo application built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Setup

1. Clone the repository :

git clone https://github.com/Nischint2003/todo-app.git
cd todo-app

2. Install dependencies:

npm install

3. Create a `.env` file in the project root and add the following:

PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Start the server:

npm run server

5. The server should now be running on `http://localhost:4000`

## API Documentation

API documentation is available at `http://localhost:4000/api-docs` when the server is running.

## Running Tests

To run the test suite:

npm test