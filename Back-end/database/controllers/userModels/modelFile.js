const { Model } = require("../../models/Model");
const path = require("path");

require("dotenv/config");

const getModelFile = (req, res) => {
  const id = req.params.modelId;
  const DIR_PATH = process.env.SERVER_URL + "/static" + "/models_files" + "/" + id;
  console.log(DIR_PATH);
  Model.findByPk(id)
    .then((model) => {
      if (!model) return res.send({ success: false, msg: "There is no model with this id." });
      // if (!model.ready) return res.send({ success: false, msg: "Model is not ready to be downloaded." });
      // if (model.file_path === "") return res.send({ success: false, msg: "There is no file for this model." });
      const filePath = DIR_PATH + "/model.h5";
      res.send({ success: true, path: filePath });
    })
    .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
};

module.exports = {
  getModelFile,
};
