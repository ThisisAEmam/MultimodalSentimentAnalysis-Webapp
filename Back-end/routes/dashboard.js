const router = require("express").Router();
const passport = require("passport");
const controllers = require("../database/controllers");

// FAQ
router.get("/faq", passport.authenticate("user", { session: false }), controllers.getAllUsers);

module.exports = router;
