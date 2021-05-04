const Sequelize = require("sequelize");
const db = require("../config");
const User = require("./User");
const ModelCategory = require("./ModelCategory");
const ModelArch = require("./ModelArch");

const Model = db.define("models", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(2000),
    allowNull: true,
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  accuracy: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
});

Model.belongsTo(User, { foreignKey: "userId" });
Model.belongsTo(ModelCategory, { foreignKey: "catId" });
Model.belongsTo(ModelArch, { foreignKey: "archId" });

const LikedModels = db.define("liked_models", {}, { timestamps: false });
const BookmarkedModels = db.define("bookmarked_models", {}, { timestamps: false });

User.belongsToMany(Model, { through: LikedModels, foreignKey: "uid" });
Model.belongsToMany(User, { through: LikedModels, foreignKey: "mid" });

User.belongsToMany(Model, { through: BookmarkedModels, foreignKey: "uid" });
Model.belongsToMany(User, { through: BookmarkedModels, foreignKey: "mid" });

module.exports = { Model, LikedModels, BookmarkedModels };
