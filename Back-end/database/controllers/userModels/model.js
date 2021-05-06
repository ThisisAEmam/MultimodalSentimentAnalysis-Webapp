const { Model } = require("../../models/Model");
const User = require("../../models/User");
const Joi = require("joi");
const crypto = require("crypto");
const getIdFromToken = require("../../../lib/getIdFromToken");

const createModel = (req, res) => {
  const validationError = validateModel(req.body);
  if (validationError) return res.send({ success: false, msg: validationError.details[0].message });
  const id = crypto.randomBytes(10).toString("hex");
  const userId = getIdFromToken(req.headers.authorization);
  Model.create({
    id: id,
    name: req.body.name,
    description: req.body.description,
    likes: req.body.likes,
    accuracy: req.body.accuracy,
    archId: req.body.archId,
    userId: userId,
    catId: req.body.catId,
  })
    .then(() => res.send({ success: true, msg: "Model created successfully!" }))
    .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
};

const getAllModels = (req, res) => {
  Model.findAll({ include: { model: User, attributes: ["username"] }, order: [["createdAt", "DESC"]] })
    .then((models) => {
      if (!models) return res.send({ success: false, msg: "There was an error." });
      if (models.length === 0) return res.send({ success: false, msg: "No models found." });
      res.send({ success: true, data: models });
    })
    .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
};

const getOneModel = (req, res) => {
  const id = req.params.id;
  Model.findAll({ where: { id: id }, include: { model: User, attributes: ["username"] } })
    .then((model) => {
      if (!model) return res.send({ success: false, msg: "No model found with this id." });
      res.send({ success: true, data: model });
    })
    .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
};

const getUserModels = (req, res) => {
  const id = getIdFromToken(req.headers.authorization);
  Model.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
        where: {
          id: id,
        },
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((models) => {
      if (!models) return res.send({ success: false, msg: "There was an error." });
      if (models.length === 0) return res.send({ success: false, msg: "You don't have any created models." });
      res.send({ success: true, data: models });
    })
    .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
};

const updateModel = (req, res) => {
  const validationError = validateUpdateModel(req.body);
  if (validationError) return res.send({ success: false, msg: validationError.details[0].message });
  const modelId = req.params.id;
  const userId = getIdFromToken(req.headers.authorization);

  Model.findByPk(modelId)
    .then((model) => {
      if (!model) return res.send({ success: false, msg: "No model found with this id." });
      if (model.userId === userId) {
        model
          .update(req.body)
          .then(() => res.send({ success: true, data: model, msg: "Updated successfully!" }))
          .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
      } else {
        res.send({ success: false, msg: "Not Authorized." });
      }
    })
    .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
};

const deleteModel = (req, res) => {
  const modelId = req.params.id;
  const userId = getIdFromToken(req.headers.authorization);

  Model.findByPk(modelId)
    .then((model) => {
      if (!model) return res.send({ success: false, msg: "No model found with this id." });
      if (model.userId === userId) {
        model
          .destroy()
          .then(() => res.send({ success: true, data: model, msg: "Deleted successfully!" }))
          .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
      } else {
        res.send({ success: false, msg: "Not Authorized." });
      }
    })
    .catch((err) => res.send({ success: false, msg: "There was an error.", error: err }));
};

const validateModel = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    likes: Joi.number().required(),
    accuracy: Joi.number().required(),
    archId: Joi.number().required(),
    catId: Joi.number().required(),
  });

  const { error } = schema.validate(data);
  return error;
};

const validateUpdateModel = (data) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    likes: Joi.number().optional(),
    accuracy: Joi.number().optional(),
    archId: Joi.number().optional(),
    catId: Joi.number().optional(),
  });

  const { error } = schema.validate(data);
  return error;
};

module.exports = {
  createModel,
  getAllModels,
  getUserModels,
  getOneModel,
  updateModel,
  deleteModel,
};
