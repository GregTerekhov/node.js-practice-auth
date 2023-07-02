const path = require("path");
const express = require("express");
require("colors");
const configPath = path.join(__dirname, "..", "config", ".env");
const dotenv = require("dotenv").config({
  path: configPath,
});
const connectDB = require("../config/connectDB");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", require("./routes/drinksRoutes"));

app.use(errorHandler);

connectDB();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.bold.italic);
});
