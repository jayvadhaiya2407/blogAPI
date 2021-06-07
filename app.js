const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Global Vars
const app = express();
const MONGO_URI = "mongodb://localhost:27017/blog";
const PORT = 3000;

const authRouter = require("./router/authRouter");

//Middlewares
app.use(bodyParser.json());

//Accepting Incomming Requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Routing Requests
app.use("/auth", authRouter);

//Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: false,
    message: err.message,
    error: err.data,
  });
});

mongoose.connect(
  MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    app.listen(PORT, () => {
      console.log("Server started at http://127.0.0.1:" + PORT);
    });
  }
);
