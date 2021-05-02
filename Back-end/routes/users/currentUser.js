const router = require("express").Router();
const pool = require("../../config/database");
const passport = require("passport");
const { validatePassword } = require("../../lib/utils");
const Joi = require("joi");
const getIdFromToken = require("../../lib/getIdFromToken");
const getPUTQuery = require("../../lib/putQuery");

router.get("/", passport.authenticate("user", { session: false }), (req, res, next) => {
  const id = getIdFromToken(req.headers.authorization);
  pool
    .query("SELECT * FROM users WHERE uid = $1", [id])
    .then((users) => {
      if (users.rowCount === 0) return res.send({ success: false, msg: `There is no user with id = ${id} registered in our database.` });
      const user = users.rows[0];
      res.send({ success: true, data: user });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.put("/", passport.authenticate("user", { session: false }), (req, res, next) => {
  const validationError = validateUpdate(req.body);
  if (validationError) return res.send({ success: false, msg: validationError.details[0].message });

  const id = getIdFromToken(req.headers.authorization);
  const { query, colsArr } = getPUTQuery("users", req.body, "uid", id);

  pool
    .query(query, colsArr)
    .then((response) => {
      res.send({ success: true, msg: `All changes have been saved!` });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.delete("/", passport.authenticate("user", { session: false }), (req, res, next) => {
  const id = getIdFromToken(req.headers.authorization);
  pool
    .query("SELECT * FROM users WHERE uid = $1", [id])
    .then((response) => {
      const user = response.rows[0];
      const isValid = validatePassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        pool
          .query("DELETE FROM users WHERE uid = $1", [id])
          .then((resp) => {
            res.send({ success: true, msg: "User has been deleted successfully!", user: user });
          })
          .catch((err) => res.send({ success: false, msg: err }));
      } else {
        res.send({ success: false, msg: "You have entered a wrong password." });
      }
      // res.send({ success: true, data:  });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

const validateUpdate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).optional(),
    organization: Joi.string().empty("").default("").optional(),
  });

  const { error } = schema.validate(data);
  return error;
};

module.exports = router;
