const Sequelize = require("sequelize");
const db = require("../config");

const Question = db.define("question", {
  question: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Question;