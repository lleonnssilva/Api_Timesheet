"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const router = express.Router();

// Connecta ao banco
mongoose.connect(
  process.env.CONNECTION_STRING
  // {
  //   useNewUrlParser: true
  // }
);

// Carrega os Models
const Appointment = require("./models/appointment");
const User = require("./models/User");

// Carrega as Rotas
const indexRoute = require("./routes/index-route");
const appointmentRoute = require("./routes/appointment-route");
const userRoute = require("./routes/user-route");

app.use(
  bodyParser.json({
    limit: "5mb"
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Habilita o CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/", indexRoute);
app.use("/appointments", appointmentRoute);
app.use("/users", userRoute);

module.exports = app;
