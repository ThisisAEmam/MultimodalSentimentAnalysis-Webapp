const db = require("../../config");
const User = require("../../models/User");
const { validatePassword, issueJWT, genPassword } = require("../../../lib/utils");
const Joi = require("joi");
const crypto = require("crypto");

const loginUser = (req, res) => {
  const emailRegex = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)$/;

  const loginHandler = (user) => {
    if (user === null) return res.send({ success: false, msg: "This username / email is not registered in our database." });
    const isValid = validatePassword(req.body.password, user.hash, user.salt);

    if (isValid) {
      const tokenObject = issueJWT(user);
      res.send({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });
    } else {
      res.send({ success: false, msg: "You have entered a wrong password." });
    }
  };

  if (emailRegex.test(req.body.username)) {
    type = "email";
    User.findOne({ where: { email: req.body.username } })
      .then((user) => loginHandler(user))
      .catch((err) => res.send({ success: false, msg: err }));
  } else {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => loginHandler(user))
      .catch((err) => res.send({ success: false, msg: err }));
  }
};

const createUser = (req, res) => {
  const validationError = validateRegister(req.body);
  if (validationError) return res.send({ success: false, msg: validationError.details[0].message });

  const { username, firstname, lastname, email, organization } = req.body;
  const { salt, hash } = genPassword(req.body.password);
  const id = crypto.randomBytes(10).toString("hex");

  User.create({
    id: id,
    username: username,
    firstname: firstname,
    lastname: lastname,
    email: email,
    organization: organization,
    hash: hash,
    salt: salt,
  })
    .then(() => res.status(201).send({ success: true, msg: "You have signed up successfully." }))
    .catch((err) => res.send({ success: false, msg: err.errors[0].message }));
};

const getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch((err) => res.send(err));
};

const validateRegister = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    organization: Joi.string().empty("").default("").optional(),
  });

  const { error } = schema.validate(data);
  return error;
};

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
};
