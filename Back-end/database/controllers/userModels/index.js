const modelArchs = require("./modelArch");
const modelCategories = require("./modelCategory");
const model = require("./model");
const modelLikeBookmark = require("./modelLikeBookmark");
const modelImage = require("./modelImage");
const modelFile = require("./modelFile");

module.exports = {
  ...modelArchs,
  ...modelCategories,
  ...model,
  ...modelLikeBookmark,
  ...modelImage,
  ...modelFile,
};
