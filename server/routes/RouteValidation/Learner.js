const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validateLearnerForUpdate(learner) {
  const schema = {
    _id: Joi.objectId().required(),
    name: Joi.string().min(2).max(30).required(),
    // userName:Joi.string().min(2).max(30).required(),
    // mobileNumber: Joi.string().min(11).max(11).required(),
    favouriteSubCategories: Joi.array()
      .items(Joi.objectId().required())
      .required(),
  };

  return Joi.validate(learner, schema);
}

exports.validateLearnerForUpdate = validateLearnerForUpdate;
