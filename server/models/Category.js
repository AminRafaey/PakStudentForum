const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 60,
  },

  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    
  ],
  description:{
    type:String,
    required:true,
    min:30,
    max:100
  },
  label:{
    type:String,
    enum:["Second1", "Second2", "Second3", "Second4", "First1", "First2", "First3"]
  }
});

function validateCategory(category) {
  const schema = {
    name: Joi.string().min(2).max(60).required(),
    subCategories: Joi.array().items(Joi.objectId().required()).required(),
    description:Joi.string().min(30).max(100).required(),
    label:Joi.string().valid("Second1", "Second2", "Second3", "Second4", "First1", "First2", "First3")
  };
  return Joi.validate(category, schema);
}

const Category = mongoose.model("Category", schema);
exports.Category = Category;
exports.validateCategory = validateCategory;
