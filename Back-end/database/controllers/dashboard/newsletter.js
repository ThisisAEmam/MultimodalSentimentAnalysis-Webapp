const Joi = require("joi");
const Newsletter = require("../../models/Newsletter");

const postNewsletter = (req, res) => {
  const error = validateNewsletter(req.body);
  if (error) return res.send({ success: false, msg: error.details[0].message });

  Newsletter.create({
    name: req.body.name,
    email: req.body.email,
  })
    .then(() => res.send({ success: true, msg: "Congratulations! You are now subscribed in our newsletter." }))
    .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
};

const validateNewsletter = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(data);
  return error;
};

module.exports = {
  postNewsletter,
};
