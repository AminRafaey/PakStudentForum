const express = require("express");
const router = express.Router();
const shuffle = require("shuffle-array");

const { Mcq, validateMcq } = require("../models/Mcq");
const {SubCategory} = require("../models/SubCategory");
const { DailyTest, validateDailyTest } = require("../models/DailyTest");

const { Learner } = require("../models/Learner");
const { validateUserName } = require("./RouteValidation/DailyTest");
const auth = require("../middleware/auth");

router.get("/:_id/:number", auth, async (req, res) => {
  
    const { error } = validateUserName(req.params);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    let learner = await Learner.findById(req.params._id);
    let dailyTest = await DailyTest.find({learnerId:req.params._id,
      date: {
        $gte: new Date().setHours(00, 00, 00),
        $lte: new Date().setHours(23, 59, 59),
      }})

      if (dailyTest.length > 0) {
        return res.status(400).send({
          field: {
            name: "Unsuccessful",
            message: "Already Attempted",
            data: ""
          },
        });
      }


    let mcqs = await Mcq.find({
      subCategories: learner.favouriteSubCategories[learner.counter],
      status: "Active",
    });
    let subCategoryName = await SubCategory.findById(learner.favouriteSubCategories[learner.counter]).select("name -_id")
    //   console.log(req.params.number);
    //   console.log(mcqs);
    //   console.log(shuffle.pick(mcqs, { 'picks': 10}));
    if (learner.counter + 1 >= learner.favouriteSubCategories.length)
      learner.counter = -1;
    await Learner.updateOne(
      { _id: learner._id },
      { learner, counter: learner.counter + 1 }
    );
console.log(shuffle.pick(mcqs, { picks: parseInt(req.params.number) }));
console.log(subCategoryName);
    if (mcqs) {
      return res.status(200).send({
        field: {
          name: "successful",
          message: "Successfully Fetched",
          data: shuffle.pick(mcqs, { picks: parseInt(req.params.number) }),
          subCategoryName,
        },
      });
    }
    return res.status(400).send({
      field: { name: "noMcq", message: "No Mcq with this SubCategory exist" },
    });
  
});

router.post("/", auth, async (req, res) => {
  try {
    const { error } = validateDailyTest(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    const dailyTest = await new DailyTest(req.body).save();
    res.status(200).send({
      field: {
        message: "Successfully Registered",
        data: dailyTest,
        name: "successful",
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});



module.exports = router;
