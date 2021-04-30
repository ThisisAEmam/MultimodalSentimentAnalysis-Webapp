const router = require("express").Router();
const pool = require("../config/database");
const passport = require("passport");
const { validatePassword, issueJWT, genPassword } = require("../lib/utils");
const Joi = require("joi");

const emailRegex = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)$/;

router.get("/protected", passport.authenticate("user", { session: false }), (req, res, next) => {
  res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
});

// Validate an existing user and issue a JWT
router.get("/currentUser", passport.authenticate("user", { session: false }), (req, res, next) => {});

router.post("/login", (req, res, next) => {
  let query = "";
  if (emailRegex.test(req.body.username)) {
    query = "SELECT * FROM users WHERE email = $1";
  } else {
    query = "SELECT * FROM users WHERE username = $1";
  }

  pool
    .query(query, [req.body.username])
    .then((users) => {
      if (users.rowCount === 0) return res.send({ success: false, msg: "You have entered a wrong username or email." });
      const user = users.rows[0];
      const isValid = validatePassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = issueJWT(user);
        res.status(200).send({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });
      } else {
        res.send({ success: false, msg: "You have entered a wrong password." });
      }
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

// Register a new user
router.post("/register", function (req, res, next) {
  const validationError = validateRegister(req.body);
  if (validationError) return res.send({ success: false, msg: validationError.details[0].message });

  const { firstName, lastName, username, email, organization } = req.body;
  const { salt, hash } = genPassword(req.body.password);
  pool
    .query("INSERT INTO users (firstName, lastName, username, email, organization, hash, salt) VALUES($1, $2, $3, $4, $5, $6, $7);", [
      firstName,
      lastName,
      username,
      email,
      organization,
      hash,
      salt,
    ])
    .then((response) => {
      res.send({ success: true, msg: req.body });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

const validateRegister = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().pattern(new RegExp(emailRegex)).required(),
    password: Joi.string().min(8).required(),
    organization: Joi.string().empty("").default("").optional(),
  });

  const { error } = schema.validate(data);
  return error;
};

module.exports = router;
