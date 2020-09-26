const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = new mongoose.Schema({
  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Learner",
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  obtained: {
    type: Number,
    required: true,
  },

  rank: {
    type: Number,
  },

  date: {
    type: Date,
    default: new Date(),
  },
});

function validateDailyTest(result) {
  const schema = {
    learnerId: Joi.objectId().required(),
    total: Joi.number().required(),
    obtained: Joi.number().required(),
  };

  return Joi.validate(result, schema);
}

const DailyTest = mongoose.model("DailyTest", schema);
exports.DailyTest = DailyTest;
exports.validateDailyTest = validateDailyTest;
