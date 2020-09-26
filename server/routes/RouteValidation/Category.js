const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateCategoryUpdate = (id) => {
  const schema = {
    _id: Joi.objectId().required(),
    name: Joi.string().min(2).max(60).required(),
    subCategories: Joi.array().items(Joi.objectId()).required(),
    description: Joi.string().min(30).max(100).required(),
    label: Joi.string().valid(
      "Second1",
      "Second2",
      "Second3",
      "Second4",
      "First1",
      "First2",
      "First3"
    ),
  };
  return Joi.validate(id, schema);
};

exports.validateCategoryUpdate = validateCategoryUpdate;
