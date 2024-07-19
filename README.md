# Todo Application

A simple Todo application built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Setup

### 1. Clone the Repository

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/Nischint2003/todo-app.git
cd todo-app
```

### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add the following configuration settings:

```
PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB connection string and JWT secret.

Example of `.env` file:

```
PORT=4000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority
JWT_SECRET=yourSuperSecretKey
```
check .env.example for refrence

### 4. Start the Server

Start the server with the following command:

```bash
npm run server
```

The server should now be running on [http://localhost:4000](http://localhost:4000).

## API Documentation

API documentation is available at [http://localhost:4000/api-docs](http://localhost:4000/api-docs) when the server is running.

## Running Tests

To run the test suite, use the following command:

```bash
npm test
```