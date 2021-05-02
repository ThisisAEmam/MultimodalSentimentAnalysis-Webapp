const router = require("express").Router();
const pool = require("../../config/database");
const passport = require("passport");
const { validatePassword, genPassword } = require("../../lib/utils");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const getIdFromToken = require("../../lib/getIdFromToken");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const PRIV_KEY = fs.readFileSync(path.join(__dirname, "..", "..", "id_rsa_priv.pem"), "utf8");
const PUB_KEY = fs.readFileSync(path.join(__dirname, "..", "..", "id_rsa_pub.pem"), "utf8");
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "446a77eb2c5d25",
    pass: "a8d7df4848b22a",
  },
});

router.post("/change", passport.authenticate("user", { session: false }), (req, res, next) => {
  const validationError = validateNewPassword(req.body);
  if (validationError) return res.send({ success: false, msg: validationError.details[0].message });

  const id = getIdFromToken(req.headers.authorization);
  const { password, newPassword, confirmPassword } = req.body;

  pool
    .query("SELECT * FROM users WHERE uid = $1", [id])
    .then((response) => {
      const user = response.rows[0];
      const isValid = validatePassword(password, user.hash, user.salt);
      if (isValid) {
        if (newPassword !== confirmPassword) return res.send({ success: false, msg: "New password and confirm password don't match." });
        const { salt, hash } = genPassword(newPassword);
        pool
          .query("UPDATE users SET hash = $1, salt = $2 WHERE uid = $3", [hash, salt, id])
          .then((resp) => {
            res.send({ success: true, msg: "Password updated successfully!" });
          })
          .catch((err) => res.send({ success: false, msg: err }));
      } else {
        res.send({ success: false, msg: "You have entered a wrong current password." });
      }
      // res.send({ success: true, data:  });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.post("/forgot", (req, res, next) => {
  const validationError = validateEmail(req.body);
  if (validationError) return res.send({ success: false, msg: validationError.details[0].message });

  const { email } = req.body;

  pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((response) => {
      if (response.rowCount === 0) return res.send({ success: false, msg: "There is no account with this email." });
      const user = response.rows[0];
      const payload = {
        sub: user.uid,
        iat: Date.now(),
      };
      const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: "1m", algorithm: "RS256" });
      const resetLink = `http://192.168.1.2:3000/reset_password/${signedToken}`;
      const html = `
        <h1>Forgot your password</h1>
        <p>There is a request sent to reset your password. If it is not you, just forget about this mail.</p>
        <p>You can use the link below to reset your password.</p>
        <a href="${resetLink}">Click here</a>
        <br />
        <br />
        <p>The link expires in 1 minute.</p>
      `;

      const message = createMail(email, "Request to reset password", html);

      transport.sendMail(message, (err, info) => {
        if (err) {
          res.send({ success: false, msg: err });
        } else {
          res.send({ success: true, msg: "An email has been sent to your inbox." });
        }
      });
      // res.send({ success: true, data:  });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.post("/reset", (req, res, next) => {
  const validationError = validateResetPasswords(req.body);
  if (validationError) return res.send({ success: false, msg: validationError.details[0].message });

  const { password, confirmPassword, token } = req.body;
  const JWTToken = token.split(" ")[1];
  jwt.verify(JWTToken, PUB_KEY, (error, decodedToken) => {
    if (error) {
      return res.status().json({ status: false, msg: "Incorrect token or expired." });
    }
  });

  const id = getIdFromToken(token);

  pool
    .query("SELECT * FROM users WHERE uid = $1", [id])
    .then((response) => {
      if (response.rowCount === 0) return res.send({ success: false, msg: "There is no account with this id." });
      if (password !== confirmPassword) return res.send({ success: false, msg: "New password and confirm password don't match." });
      const { salt, hash } = genPassword(password);
      pool
        .query("UPDATE users SET hash = $1, salt = $2 WHERE uid = $3", [hash, salt, id])
        .then((resp) => {
          res.send({ success: true, msg: "Password updated successfully!" });
        })
        .catch((err) => res.send({ success: false, msg: err }));
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

const validateResetPasswords = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required(),
    token: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  return error;
};

const validateNewPassword = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(data);
  return error;
};

const validateEmail = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(data);
  return error;
};

const createMail = (recipients, subject, html) => {
  return {
    from: "admin@msa.com",
    to: recipients,
    subject: subject,
    html: html,
  };
};

module.exports = router;
