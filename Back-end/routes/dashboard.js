const router = require("express").Router();
const passport = require("passport");
const controllers = require("../database/controllers/dashboard");

// FAQ
router.get("/faq", passport.authenticate("user", { session: false }), controllers.getAllQuestions);
router.post("/faq", passport.authenticate("admin", { session: false }), controllers.postQuestion);
router.put("/faq/:id", passport.authenticate("admin", { session: false }), controllers.updateQuestion);
router.delete("/faq/:id", passport.authenticate("admin", { session: false }), controllers.deleteQuestion);

// Newsletter
router.post("/newsletter", passport.authenticate("user", { session: false }), controllers.postNewsletter);

module.exports = router;
