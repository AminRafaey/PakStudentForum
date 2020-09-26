const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
    min: 10,
    max: 700,
  },

  mcqId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mcq",
    required: true,
  },

  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Learner",
  },

  errorCategory: {
    type: String,
    enum: [
      "The Options are wrong",
      "I caught a typo",
      "MCQ statement is not valid",
    ],
  },

  type: {
    type: String,
    enum: ["Problem", "Comment"],
    required: true,
  },

  date: {
    type: Date,
    default: new Date(),
  },
});

function validateFeedback(feedback) {
  const schema = {
    statement: Joi.string().min(10).max(700).required(),
    mcqId: Joi.objectId().required(),
    errorCategory: Joi.string()
      .valid(
        "The Options are wrong",
        "I caught a typo",
        "MCQ statement is not valid"
      )
      .required(),
    type: Joi.string().valid("Problem").required(),
  };
  return Joi.validate(feedback, schema);
}

function validateComment(comment) {
  const schema = {
    statement: Joi.string().min(10).max(700).required(),
    mcqId: Joi.objectId().required(),
    learnerId: Joi.objectId().required(),
    type: Joi.string().valid("Comment").required(),
  };
  return Joi.validate(comment, schema);
}

const FeedBack = mongoose.model("FeedBack", schema);
exports.FeedBack = FeedBack;
exports.validateFeedback = validateFeedback;
exports.validateComment = validateComment;
