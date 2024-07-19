require("dotenv").config({ path: ".env.test" });
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

describe("Auth Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      body: {},
    };
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next() if token is valid", () => {
    const token = jwt.sign({ id: "user123" }, process.env.JWT_SECRET);
    req.headers.token = token;

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.body.userId).toBe("user123");
  });

  it("should return error if no token is provided", () => {
    authMiddleware(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Not Authorized, login again",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return error if token is invalid", () => {
    req.headers.token = "invalidtoken";

    authMiddleware(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid or expired token",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
