const router = require("express").Router();
const crypto = require("crypto");
const pool = require("../../config/database");
const passport = require("passport");
const { validatePassword, issueJWT, genPassword } = require("../../lib/utils");
const Joi = require("joi");

// RETURN THE CURRENT USER
router.get("/", passport.authenticate("admin", { session: false }), (req, res, next) => {
  pool
    .query("SELECT * FROM users")
    .then((response) => {
      if (response.rowCount === 0) return res.send({ success: false, msg: "We have no users right now." });
      const users = response.rows;
      res.send({ success: true, data: users });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.post("/login", (req, res, next) => {
  const emailRegex = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)$/;
  let query = "";
  if (emailRegex.test(req.body.username)) {
    query = "SELECT * FROM users WHERE email = $1";
  } else {
    query = "SELECT * FROM users WHERE username = $1";
  }

  pool
    .query(query, [req.body.username])
    .then((users) => {
      if (users.rowCount === 0) return res.send({ success: false, msg: "This username/email is not registered in our database." });
      const user = users.rows[0];
      const isValid = validatePassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = issueJWT(user);
        res.send({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });
      } else {
        res.send({ success: false, msg: "You have entered a wrong password." });
      }
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

// Register a new user
router.post("/signup", (req, res, next) => {
  const validationError = validateRegister(req.body);
  if (validationError) return res.send({ success: false, msg: validationError.details[0].message });

  const { firstName, lastName, username, email, organization } = req.body;
  const { salt, hash } = genPassword(req.body.password);
  const id = crypto.randomBytes(16).toString("hex");
  pool
    .query("INSERT INTO users (uid, firstName, lastName, username, email, organization, hash, salt) VALUES($1, $2, $3, $4, $5, $6, $7, $8);", [
      id,
      firstName,
      lastName,
      username,
      email,
      organization,
      hash,
      salt,
    ])
    .then((response) => {
      res.send({ success: true, msg: "You have signed up successfully." });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

const validateRegister = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    organization: Joi.string().empty("").default("").optional(),
  });

  const { error } = schema.validate(data);
  return error;
};

module.exports = router;
