const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateSubCategoryId = (id) => {
  const schema = {
    _id: Joi.objectId().required(),
  };
  return Joi.validate(id, schema);
};

const validateSubCategoryUpdate = (id) => {
  const schema = {
    _id: Joi.objectId().required(),
    newName: Joi.string().min(2).max(30).required()
  };
  return Joi.validate(id, schema);
};

exports.validateSubCategoryId = validateSubCategoryId;
exports.validateSubCategoryUpdate = validateSubCategoryUpdate;
