const router = require("express").Router();

router.use("/users/me", require("./users/currentUser"));
router.use("/users/password", require("./users/passwordRelated"));
router.use("/users", require("./users/index"));
router.use("/faq", require("./dashboard/FAQ"));

module.exports = router;
