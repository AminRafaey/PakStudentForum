const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateUserName = (data) => {
  const schema = {
    _id: Joi.objectId().required(),
    number: Joi.number().min(1).required(),
  };
  return Joi.validate(data, schema);
};

exports.validateUserName = validateUserName;
