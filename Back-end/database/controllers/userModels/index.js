const modelArchs = require("./modelArch");
const modelCategories = require("./modelCategory");
const model = require("./model");
const modelLikeBookmark = require("./modelLikeBookmark");

module.exports = {
  ...modelArchs,
  ...modelCategories,
  ...model,
  ...modelLikeBookmark,
};
