const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { Mcq, validateMcq, validateSuggestion } = require("../models/Mcq");
const {
  validateMcqId,
  validateLearnerSuggestionDeletion,
  validateMcqFetchingForLearner,
  validateMcqForUpdate
} = require("./RouteValidation/Mcq");
const { SubCategory } = require("../models/SubCategory");
const { User } = require("../models/User");
const { Learner } = require("../models/Learner");
const isAdmin = require("../middleware/isAdmin.js");
const auth = require("../middleware/auth");

/* For Adding new Mcq */

router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const { error } = validateMcq(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    let mcq = await Mcq.findOne({
      statement: req.body.statement,
    });
    if (mcq)
      return res.status(400).send({
        field: {
          name: "statement",
          message: "Mcq already Exist",
        },
      });

    for (subCategory of req.body.subCategories) {
      if (!(await SubCategory.findById(subCategory)))
        return res.status(400).send({
          field: {
            name: "subCategoryId",
            message: "SubCategory Id is not valid",
          },
        });
    }

    mcq = await new Mcq(req.body).save();
    res.status(200).send({
      field: {
        message: "Successfully Registered",
        data: mcq,
        name: "successful",
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

/* For updating Mcq */
router.put("/", auth, isAdmin, async (req, res) => {
  try {
    console.log("here")
    let { _id, ...data } = req.body;
    const { error } = validateMcqForUpdate(data);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    if (!(await Mcq.findById(_id))) {
      return res.status(400).send({
        field: { name: "mcqId", message: "No Mcq with this Id exist" },
      });
    }

    let mcq = await Mcq.find().and([
      {
        statement: data.statement,
      },
      { _id: { $ne: _id } },
    ]);

    if (mcq.length > 0)
      return res.status(400).send({
        field: {
          name: "mcq",
          message: "Mcq already Exist",
        },
      });

    const updatedMcq = await Mcq.updateOne({ _id: _id }, data);
    res.status(200).send({
      field: {
        name: "successful",
        message: "Successfully updated",
        data: updatedMcq,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

/* Delete Mcq */

router.delete("/",auth, isAdmin, async (req, res) => {
  try {
    const { error } = validateMcqId(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    // if (!(await Mcq.findById(req.body._id))) {
    //   return res.send({
    //     field: { name: "mcqId", message: "No Mcq with this Id exist" },
    //   });
    // }

    const mcq = await Mcq.findByIdAndDelete(req.body._id);
    res.send({
      field: {
        name: "successful",
        message: "Successfully Deleted",
        data: mcq,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

/* For adding Suggestion */

router.post("/suggestion", auth, async (req, res) => {
  try {
    console.log(req.body)
    req.body.status = "Suggestion";
    const { error } = validateSuggestion(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    let mcq = await Mcq.findOne({
      statement: req.body.statement,
    });
    if (mcq)
      return res.status(400).send({
        field: {
          name: "mcq",
          message: "This Mcq already Exist, Please suggest some other one",
        },
      });

    let learner = await Learner.findById(req.body.learnerId);
    if (!learner)
      return res.status(400).send({
        field: {
          name: "LearnerId",
          message: "No Learner with this Id exist",
        },
      });

    mcq = await new Mcq({ ...req.body}).save();
    res.status(200).send({
      field: {
        message: "Thank you!!! This will help us to serve you even better with more mcqs",
        name: "successful",
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

/* For deleting Suggestion */
router.delete("/suggestion/:_id", auth, isAdmin, async (req, res) => {
  try {
    const { error } = validateMcqId(req.params);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    if (
      !(await Mcq.findOne().and([
        { _id: req.params._id },
        { status: "Suggestion" },
      ]))
    ) {
      return res.status(400).send({
        field: { name: "mcqId", message: "No Suggestion with this Id exist" },
      });
    }

    const suggestion = await Mcq.findByIdAndDelete(req.params._id);
    res.send({
      field: {
        name: "successful",
        message: "Successfully Deleted",
        data: suggestion,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

/* For User Deleting his suggestion */

router.delete("/learnerSuggestion/delete", async (req, res) => {
  try {
    const { error } = validateLearnerSuggestionDeletion(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    if (
      !(await Mcq.findOne().and([
        { _id: req.body._id },
        { learnerId: req.body.learnerId },
      ]))
    ) {
      return res.status(400).send({
        field: { name: "mcqId", message: "No Suggestion with this Id exist" },
      });
    }

    const suggestion = await Mcq.findByIdAndDelete(req.body._id);
    res.send({
      field: {
        name: "successful",
        message: "Successfully Deleted",
        data: suggestion,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

/* For user reading or practising */

router.get("/:subCategoryId/:pageSize/:pageNumber/:isMcqCountNeeded", async (req, res) => {
  
    console.log(req.params);
    
    const { error } = validateMcqFetchingForLearner(
      req.params
    );
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

      const {subCategoryId, pageNumber, pageSize, isMcqCountNeeded} = req.params;
    const subCategory = await SubCategory.findById(subCategoryId);

    if (!subCategory)
      return res.status(400).send({
        field: { name: "subCategory", message: "SubCategory not exist" },
      });

    const mcqs = await Mcq.find({
      subCategories: subCategoryId,
      status: "Active",
    }).populate("subCategories", "-numOfShare -__v -Active") .skip((parseInt(pageNumber)-1)*parseInt(pageSize)).limit(parseInt(pageSize));
    
    if (mcqs) {
      if(isMcqCountNeeded === "true"){
        return res.send({
          field: {
            name: "successful",
            message: "Successfully Fetched",
            data: mcqs,
            count: await Mcq.find({subCategories: subCategoryId}).count()
          },
        });
      }
      return res.send({
        field: {
          name: "successful",
          message: "Successfully Fetched",
          data: mcqs,
        },
      });
      
    }
    return res.status(400).send({
      field: { name: "noMcq", message: "No Mcq with this SubCategory exist" },
    });
 
});

router.get("/homePageMcq", async(req,res)=>{
  try{
    let output=null;
    const mcq = await Mcq.find()
    return res.status(200).send({
      field: {
        name: "successful",
        message: "Successfully Fetched",
        data: mcq,
      },
    })
  }
  catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
})

module.exports = router;
