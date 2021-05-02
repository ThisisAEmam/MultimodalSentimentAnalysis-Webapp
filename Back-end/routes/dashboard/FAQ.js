const router = require("express").Router();
const crypto = require("crypto");
const pool = require("../../config/database");
const passport = require("passport");
const Joi = require("joi");
const getPUTQuery = require("../../lib/putQuery");

router.get("/", passport.authenticate("user", { session: false }), (req, res, next) => {
  pool
    .query("SELECT * FROM Question;")
    .then((questions) => {
      res.status(200).send({ success: true, data: questions.rows });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.get("/:id", passport.authenticate("user", { session: false }), (req, res, next) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM Question WHERE qid = $1;", [id])
    .then((questions) => {
      res.status(200).send({ success: true, data: questions.rows });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.post("/", passport.authenticate("admin", { session: false }), (req, res, next) => {
  const error = validateFAQ(req.body);
  if (error) return res.send({ success: false, msg: error });

  const id = crypto.randomBytes(16).toString("hex");
  pool
    .query("INSERT INTO Question (qid, question, answer) VALUES($1, $2, $3)", [id, req.body.question, req.body.answer])
    .then((response) => {
      res.status(200).send({ success: true, msg: "Question added successfully!" });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.put("/:id", passport.authenticate("admin", { session: false }), (req, res, next) => {
  const id = req.params.id;
  const error = validatePUTFAQ(req.body);
  if (error) return res.send({ success: false, msg: error });
  const { query, colsArr } = getPUTQuery("Question", req.body, "qid", id);
  pool
    .query(query, colsArr)
    .then((response) => {
      res.status(200).send({ success: true, msg: `Question with id ${id} is updated!` });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

router.delete("/:id", passport.authenticate("admin", { session: false }), (req, res, next) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM Question WHERE qid = $1", [id])
    .then((response) => {
      res.status(200).send({ success: true, msg: `Question with id ${id} is deleted!` });
    })
    .catch((err) => res.send({ success: false, msg: err }));
});

const validateFAQ = (data) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  return error;
};

const validatePUTFAQ = (data) => {
  const schema = Joi.object({
    question: Joi.string().optional(),
    answer: Joi.string().optional(),
  });

  const { error } = schema.validate(data);
  return error;
};

module.exports = router;
