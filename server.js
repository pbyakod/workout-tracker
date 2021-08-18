// loading in express, mongoose, routes, PORT, app, and path
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require('./routes')
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path')

// middleware code to parse JSON content through application
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)

const MONGODB_URI = 'mongodb+srv://user-1:passwordauth123@cluster0.y5cwp.mongodb.net/workout?retryWrites=true&w=majority'

// connecting to monogoose server
mongoose.connect(MONGODB_URI || "mongodb://localhost/workout", 
  { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
  }
);

// deploying the application to localhost 3000
app.listen(PORT, () => {
  console.log(`Your application is now running at http://localhost:${PORT}`);
});
