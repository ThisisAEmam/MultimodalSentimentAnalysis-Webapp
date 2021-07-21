const { Model } = require("../../models/Model");
const axios = require("axios");

const startTraining = (req, res) => {
  console.log("asd123 started training...");
  res.send("Hello from nodejs");
};

const finishTraining = (req, res) => {
  console.log("asd123 finished training...");
  console.log(req.body);
  axios
    .get(`${process.env.FLASK_URL}/finish_model/`)
    .then()
    .catch((err) => console.log(err));
  res.send("Hello from nodejs");
};

module.exports = {
  startTraining,
  finishTraining,
};
