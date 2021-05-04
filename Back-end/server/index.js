const express = require("express");
const passport = require("passport");
const cors = require("cors");
const routes = require("../routes");
const db = require("../database/config");
require("../database/config");
require("../config/passport")(passport);

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(passport.initialize());

server.use(cors());

server.use("/api", routes);

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((error) => console.log(error));

db.sync({ force: false });

module.exports = server;