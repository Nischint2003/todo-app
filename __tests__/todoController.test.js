require("dotenv").config({ path: ".env.test" });
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const express = require("express");
const todoRouter = require("../routes/todoRoute");
const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

let mongoServer;
const app = express();
app.use(express.json());
app.use("/api/todo", todoRouter);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Todo Controller", () => {
  let token;
  let userId;

  beforeEach(async () => {
    await Todo.deleteMany({});
    await User.deleteMany({});

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    userId = user._id;
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  });

  describe("POST /api/todo/add", () => {
    it("should add a new todo", async () => {
      const res = await request(app)
        .post("/api/todo/add")
        .set("token", token)
        .send({
          title: "Test Todo",
          description: "Test Description",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message.title).toBe("Test Todo");
      expect(res.body.message.description).toBe("Test Description");
    });
  });

  describe("GET /api/todo/get", () => {
    it("should get all todos for a user", async () => {
      await Todo.create({
        user: userId,
        title: "Test Todo",
        description: "Test Description",
      });

      const res = await request(app).get("/api/todo/get").set("token", token);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toHaveLength(1);
      expect(res.body.message[0].title).toBe("Test Todo");
    });
  });

  describe("PUT /api/todo/status/:id", () => {
    it("should toggle the status of a todo", async () => {
      const todo = await Todo.create({
        user: userId,
        title: "Test Todo",
        description: "Test Description",
      });

      const res = await request(app)
        .put(`/api/todo/status/${todo._id}`)
        .set("token", token);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message.status).toBe(true);
    });
  });

  describe("PUT /api/todo/update/:id", () => {
    it("should update a todo", async () => {
      const todo = await Todo.create({
        user: userId,
        title: "Test Todo",
        description: "Test Description",
      });

      const res = await request(app)
        .put(`/api/todo/update/${todo._id}`)
        .set("token", token)
        .send({
          title: "Updated Todo",
          description: "Updated Description",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Updated Todo");
      expect(res.body.data.description).toBe("Updated Description");
    });
  });

  describe("DELETE /api/todo/delete/:id", () => {
    it("should delete a todo", async () => {
      const todo = await Todo.create({
        user: userId,
        title: "Test Todo",
        description: "Test Description",
      });

      const res = await request(app)
        .delete(`/api/todo/delete/${todo._id}`)
        .set("token", token);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message._id.toString()).toBe(todo._id.toString());

      const deletedTodo = await Todo.findById(todo._id);
      expect(deletedTodo).toBeNull();
    });
  });
});
