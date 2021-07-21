const router = require("express").Router();
const controllers = require("../database/controllers/flask");

// User Data
router.post("/start_training/:modelId", controllers.startTraining);
router.post("/finish_training/:modelId", controllers.finishTraining);

module.exports = router;
