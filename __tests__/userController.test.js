require("dotenv").config({ path: ".env.test" });
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const express = require("express");
const userRouter = require("../routes/userRoute");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

let mongoServer;
const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Controller", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/users/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/users/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    it("should not register a user with an existing email", async () => {
      await User.create({
        name: "Existing User",
        email: "existing@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/users/register").send({
        name: "Test User",
        email: "existing@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("User already exists");
    });
  });

  describe("POST /api/users/login", () => {
    beforeEach(async () => {
      await User.create({
        name: "Test User",
        email: "test@example.com",
        password: await bcrypt.hash("password123", 10),
      });
    });

    it("should login a user with correct credentials", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    it("should not login a user with incorrect password", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("invalid credentials");
    });
  });
});
