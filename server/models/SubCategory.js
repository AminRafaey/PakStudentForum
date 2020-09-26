const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
    unique: true,
  }
});

function validateSubCategory(subCategory) {
  const schema = {
    name:  Joi.array().items(Joi.string().min(2).max(30).required()).required(),
  };
  return Joi.validate(subCategory, schema);
}

const SubCategory = mongoose.model("SubCategory", schema);
exports.SubCategory = SubCategory;
exports.validateSubCategory = validateSubCategory;
