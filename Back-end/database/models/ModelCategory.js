const Sequelize = require("sequelize");
const db = require("../config");

const ModelCategory = db.define("model_categories", {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ModelCategory;
