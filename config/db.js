const mongoose = require("mongoose");

exports.connectDB = (URI) => {
  mongoose.connect(URI).then(() => {
    console.log("Database Connected");
  });
};
