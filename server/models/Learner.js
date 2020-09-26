const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },

  userName: {
    type: String,
    unique: true,
    min: 2,
    max: 30,
    required: true,
  },

  favouriteSubCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
  ],

  counter: {
    type: Number,
    default: 0,
  },
});

function validateLearner(learner) {
  const schema = {
    name: Joi.string().min(2).max(30).required(),
    userName: Joi.string().min(2).max(30).required(),
    favouriteSubCategories: Joi.array()
      .items(Joi.objectId().required())
      .required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().trim().strict().min(4).max(30).required(),
  };

  return Joi.validate(learner, schema);
}

const Learner = mongoose.model("Learner", schema);
exports.Learner = Learner;
exports.validateLearner = validateLearner;
