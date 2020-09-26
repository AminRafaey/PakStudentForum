const express = require("express");
const router = express.Router();
const { Category } = require("../models/Category");
const { SubCategory } = require("../models/SubCategory");
const { Mcq } = require("../models/Mcq");

router.get("/", async (req, res) => {
  try {
    const mcqs = [];
    const options = [
      "First1",
      "First2",
      "First3",
      "Second1",
      "Second2",
      "Second3",
      "Second4",
    ];
    const categories = await Category.find().select("-__v");

    let index = null;
    let temp = null;
    for (let c1 = 0; c1 < options.length; c1++) {
      index = categories.findIndex((c) => c.label === options[c1]);
      if (index !== -1) {
        temp = categories[index];
        categories[index] = categories[c1];
        categories[c1] = temp;
      }
    }

    for (let c2 = 0; c2 < 3; c2++) {
      if (categories[c2].subCategories[0]) {
        mcqs[c2] = await Mcq.findOne({
          subCategories: categories[c2].subCategories[0],
          status: "Active",
        }).populate("subCategories", "-numOfShare -__v -Active");
      } else {
        mcqs[c2] = await Mcq.findOne({
          subCategories: categories[0].subCategories[0],
          status: "Active",
        }).populate("subCategories", "-numOfShare -__v -Active");
      }
    }

    return res.status(200).send({
      field: {
        name: "successful",
        message: "Successfully Fetched",
        data: { categories, mcqs },
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

module.exports = router;
