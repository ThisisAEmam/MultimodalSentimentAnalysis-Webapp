const router = require("express").Router();
const passport = require("passport");
const controllers = require("../database/controllers");

// Login and Register
router.post("/login", controllers.loginUser);
router.post("/signup", controllers.createUser);
router.get("/", passport.authenticate("admin", { session: false }), controllers.getAllUsers);

// Current User
router.get("/me", passport.authenticate("user", { session: false }), controllers.getCurrentUser);
router.put("/me", passport.authenticate("user", { session: false }), controllers.updateCurrentUser);
router.delete("/me", passport.authenticate("user", { session: false }), controllers.deleteCurrentUser);

// Password
router.post("/password/change", controllers.changePassword);
router.post("/password/forgot", controllers.forgotPassword);
router.post("/password/reset", controllers.resetPassword);

module.exports = router;
