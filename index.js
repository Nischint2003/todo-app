require("dotenv").config();
const express = require("express");
const { swaggerUi, specs } = require('./swagger');
const { connectDB } = require("./config/db.js");
const todoRouter = require("./routes/todoRoute.js");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoute.js");

//app config
const app = express();
const PORT = process.env.PORT;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//db connection
connectDB(process.env.MONGO_URL);

//api endpoints
app.use("/api/users", userRouter);
app.use("/api/todo", todoRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
