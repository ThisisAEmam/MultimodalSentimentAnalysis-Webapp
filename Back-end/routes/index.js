const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/faq", require("./dashboard/FAQ"));

module.exports = router;
