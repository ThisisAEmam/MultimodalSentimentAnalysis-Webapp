const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/dashboard", require("./dashboard"));
router.use("/models", require("./models"));

module.exports = router;
