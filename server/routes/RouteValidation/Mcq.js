const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateMcqId = (id) => {
  const schema = {
    _id: Joi.objectId().required(),
  };
  return Joi.validate(id, schema);
};

const validateLearnerSuggestionDeletion = (data) => {
  const schema = {
    _id: Joi.objectId().required(),
    learnerId: Joi.objectId().required(),
  };
  return Joi.validate(data, schema);
};

const validateMcqFetchingForLearner = (data) => {
  const schema = {
    subCategoryId: Joi.objectId().required(),
    pageNumber: Joi.number().min(0).required(),
    pageSize: Joi.number().min(1).required(),
    isMcqCountNeeded: Joi.string().valid(["true", "false"])
  };

  return Joi.validate(data, schema);
};

function validateMcqForUpdate(mcq) {
  const schema = {
    statement: Joi.string().min(10).max(600).required(),
    options: Joi.object()
      .keys({
        a: Joi.string().min(1).max(300).required(),
        b: Joi.string().min(1).max(300).required(),
        c: Joi.string().min(1).max(300),
        d: Joi.string().min(1).max(300),
        correct: Joi.string().valid("a", "b", "c", "d").required(),
      })
      .required(),
    subCategories: Joi.array().items(Joi.objectId().required()).required(),
    status:Joi.string().required(),
    numOfShares:Joi.number().required(),
    date:Joi.required(),
    learnerId:Joi.objectId()
  };
  return Joi.validate(mcq, schema);
}

exports.validateMcqId = validateMcqId;
exports.validateLearnerSuggestionDeletion = validateLearnerSuggestionDeletion;
exports.validateMcqFetchingForLearner = validateMcqFetchingForLearner;
exports.validateMcqForUpdate = validateMcqForUpdate;
