const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.token;
  if (!authHeader) {
    return res.json({ success: false, message: "Not Authorized, login again" });
  }

  try {
    const token = authHeader
      .replace(/^Bearer\s+/i, "")
      .split(" ")
      .pop();

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
