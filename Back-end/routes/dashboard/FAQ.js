const router = require("express").Router();
const pool = require("../../config/database");
const passport = require("passport");
const atob = require("atob");
const Joi = require("joi");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  pool
    .query("SELECT * FROM Question;")
    .then((questions) => {
      res.status(200).send({ success: false, data: questions.rows });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.post("/", passport.authenticate("admin", { session: false }), (req, res, next) => {
  const { sub } = parseJWT(req.headers.authorization);
  if (isAdmin(sub)) {
    const error = validateFAQ(req.body);
    if (error) return res.send({ success: false, msg: error });

    pool
      .query("INSERT INTO Question (question, answer) VALUES($1, $2)", [req.body.question, req.body.answer])
      .then((response) => {
        res.status(200).send({ success: true, msg: "Question added successfully!" });
      })
      .catch((err) => res.send({ success: false, msg: err }));
  } else {
    res.status(401).send({ success: false, msg: "You are not authorized to add a question." });
  }
});

const parseJWT = (token) => {
  var base64Url = token.split(" ")[1].split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const validateFAQ = (data) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  return error;
};

module.exports = router;
