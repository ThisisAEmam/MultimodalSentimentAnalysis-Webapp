const { Model } = require("../../models/Model");
const path = require("path");
const fs = require("fs");

const predictVideo = (req, res) => {
  if (req.body.files === null) return res.send({ success: false, msg: "No file is uploaded!" });
  const id = req.params.modelId;
  Model.findByPk(id)
    .then((model) => {
      if (!model) return res.send({ success: false, msg: "No model is found with this id." });
    })
    .catch((err) => console.log(err));

  const DIR_PATH = path.join(__dirname, "..", "..", "..", "static", "videos_predict");

  const files = fs.readdirSync(DIR_PATH);
  files.forEach((file) => {
    if (file.startsWith(id)) {
      fs.rmdirSync(path.join(DIR_PATH, file));
    }
  });
  const VIDEO_DIR_PATH = path.join(DIR_PATH, id);
  fs.mkdirSync(VIDEO_DIR_PATH);
  const video = req.files.video;
  const videoName = "predict" + "." + video.name.split(".")[1];
  const videoPath = path.join(VIDEO_DIR_PATH, videoName);

  video.mv(videoPath, (err) => {
    if (err) {
      res.send({ success: false, msg: "There was an error in moving the video", err: err });
    }
  });
  res.send({ success: true, msg: "Predicted successfully!" });
};

const videoPredictions = (req, res) => {
  console.log("Predictions returned successfully!");
  res.send({ success: true, msg: "Predicted successfully!" });
};

module.exports = {
  predictVideo,
  videoPredictions,
};
