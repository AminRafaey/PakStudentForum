const express = require("express");
const router = express.Router();
const {
  FeedBack,
  validateFeedback,
  validateComment,
} = require("../models/FeedBack");
const {
  validateFeedBackId,
  validatePaginationFetching,
} = require("./RouteValidation/FeedBack");
const { Mcq } = require("../models/Mcq");
const { SubCategory } = require("../models/SubCategory");
const isAdmin = require("../middleware/isAdmin.js");
const auth = require("../middleware/auth");

/* For Adding a problem in Mcq */
router.post("/problem", async (req, res) => {
  try {
    const { error } = validateFeedback(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    if (!(await Mcq.findById(req.body.mcqId))) {
      return res.send({
        field: { name: "mcqId", message: "No Mcq with this Id exist" },
      });
    }

    const feedBack = await new FeedBack(req.body).save();
    res.status(200).send({
      field: {
        message: "Thank you for taking the time to inform us about an issue.",
        data: feedBack,
        name: "successful",
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

/* For Adding a comment */

router.post("/comment", async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    if (!(await Mcq.findById(req.body.mcqId))) {
      return res.send({
        field: { name: "mcqId", message: "No Mcq with this Id exist" },
      });
    }

    const feedBack = await new FeedBack(req.body).save();
    res.status(200).send({
      field: {
        message: "Successfully Registered",
       // data: feedBack,
        name: "successful",
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

/* For getting problems with pagination*/
router.get("/problems/:pageSize/:pageNumber", auth, isAdmin, async (req, res) => {
  try{
  let { pageNumber, pageSize } = req.params;
  pageSize = parseInt(pageSize);
  pageNumber = parseInt(pageNumber);
  console.log(req.params);
  const { error } = validatePaginationFetching(req.params);
  if (error)
    return res.status(400).send({
      field: {
        message: error.details[0].message,
        name: error.details[0].path[0],
      },
    });

  const feedBack = await FeedBack.find({
    type: "Problem",
  })
    .sort({ date: -1 })
    .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
    .limit(parseInt(pageSize))
    .populate({path:"mcqId",select:"-numOfShares -__v -status",populate:{path:"subCategories"}},)
    .select("-__v -type");
  console.log(feedBack[0]);

  res.send({
    field: {
      name: "successfull",
      message: "Problems found in the given time lapse",
      data: feedBack,
    },
  });
} catch (error) {
  res.status(500).send({
    field: { message: "Unexpected error occured", name: "unexpected" },
  });
}
});

/* For reading comments of specific time period */
router.get("/comment", async (req, res) => {
  try {
    
    const feedBack = await FeedBack.find({
      date: {
        $gte: new Date(new Date(req.body.start).setHours(00, 00, 00)),
        $lte: new Date(new Date(req.body.end).setHours(23, 59, 59)),
      },
      type: "Comment",
    }).populate("mcqId learnerId");
    if (feedBack.length >= 1)
      res.send({
        field: {
          name: "successfull",
          message: "Comment found in the given time lapse",
          data: feedBack,
        },
      });
    else
      res.send({
        field: {
          name: "noComment",
          message: "No Commment found in the given time lapse",
        },
      });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

/* For deleting FeedBack By Admin*/

router.delete("/:_id", auth, isAdmin, async (req, res) => {
  try {
    const { error } = validateFeedBackId(req.params);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    if (!(await FeedBack.findById(req.params._id))) {
      return res.send({
        field: {
          name: "feedBackId",
          message: "No FeedBack with this Id exist",
        },
      });
    }

    const feedBack = await FeedBack.deleteOne(req.params);
    res.send({
      field: {
        name: "successful",
        message: "Successfully Deleted",
        data: feedBack,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

// router.delete("/comment", async(req, res)=>{
//     try{
//         const { error } = validateFeedBackId(req.body);
//     if (error)
//       return res.status(400).send({
//         field: {
//           message: error.details[0].message,
//           name: error.details[0].path[0],
//         },
//       });

//     if (!(await FeedBack.findById(req.body._id))) {
//       return res.send({
//         field: { name: "feedBackId", message: "No FeedBack with this Id exist" },
//       });
//     }

//     const comment = FeedBack.deleteOne(req.body._id)
//     res.send({
//       field: {
//         name: "successful",
//         message: "Successfully Assigned",
//         data: comment,
//       },
//     });
//     }
//     catch (error) {
//         res.status(500).send({
//           field: { message: "Unexpected error occured", name: "unexpected" },
//         });
//       }
// })

// For recieveing suggestions with pagination
router.get("/suggestions/:pageSize/:pageNumber", auth, isAdmin, async (req, res) => {
  try {
    //const test = await Mcq.deleteMany({status:"Suggestion"})
    let { pageNumber, pageSize } = req.params;
    pageSize = parseInt(pageSize);
    pageNumber = parseInt(pageNumber);
    //console.log(req.params);

    const { error } = validatePaginationFetching();
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });
    const mcqs = await Mcq.find({
      status: "Suggestion",
    })
      .sort({ date: -1 })
      .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize))
      .populate("learnerId", "-counter -favouriteSubCategories -__v -name")
      .select("-__v -numOfShares -status -subCategories");

    return res.send({
      field: {
        name: "successful",
        message: "Successfully Fetched",
        data: mcqs,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

//For getting comments of specific mcqs
router.get("/comments/:mcqId", async (req, res) => {
  console.log(req.params);
  const { error } = validateFeedBackId({_id:req.params.mcqId});
  if (error)
    return res.status(400).send({
      field: {
        message: error.details[0].message,
        name: error.details[0].path[0],
      },
    });

  const feedBack = await FeedBack.find({
    mcqId:req.params.mcqId,
    type: "Comment",
  }).populate("learnerId")
    .sort({ date: 1 })
    .select("-__v");

  res.send({
    field: {
      name: "successfull",
      message: "Comments found for the given mcq",
      data: feedBack,
    },
  });
});


module.exports = router;
