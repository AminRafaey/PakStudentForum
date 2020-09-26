const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateFeedBackId = (id) => {
  const schema = {
    _id: Joi.objectId().required(),
  };
  return Joi.validate(id, schema);
};

const validatePaginationFetching = (data) => {
  
  const schema = {
    pageNumber: Joi.number().min(0).required(),
    pageSize: Joi.number().min(1).required(),
  };

  return Joi.validate(data, schema);
};

exports.validateFeedBackId = validateFeedBackId;
exports.validatePaginationFetching = validatePaginationFetching ;
