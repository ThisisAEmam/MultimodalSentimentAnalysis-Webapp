const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/dashboard", require("./dashboard"));

module.exports = router;
