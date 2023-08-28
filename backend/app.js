const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/usersController");
const loginRouter = require("./controllers/login");
const transactionsRouter = require("./controllers/transactionsController");
const goalsRouter = require("./controllers/goalsController");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("Connecting...", config.PORT);

mongoose
  .connect(config.DB_URI)
  .then((result) => {
    logger.info("Connected to the database");
  })
  .catch((error) => {
    logger.greska("Error while connecting", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(middleware.zahtjevInfo);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/goals", goalsRouter);

app.use(middleware.nepoznataRuta);
app.use(middleware.errorHandler);

module.exports = app;
