const Sequelize = require("sequelize");
const db = require("../config");

const Newsletter = db.define("newsletter", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Newsletter;
