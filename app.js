const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 80;
const mongoUrl = process.env.DATABASE;
const app = express();

// Mongoose and Database section or configuration
const mongoose = require("mongoose");
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database is connected.");
});

//Body Parser Section
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser configuration
app.use(bodyParser.json()); // bodyParser configuration

// SERVING STATIC FOLDER AND VIEW ENGINGE
app.use(express.static("public"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Import Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
// Server configuration
app.listen(PORT, () => console.log(`App is running at Port=> ${PORT}`));
