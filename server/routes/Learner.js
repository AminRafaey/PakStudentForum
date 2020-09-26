const express = require("express");
const router = express.Router();
const { Learner, validateLearner } = require("../models/Learner");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { SubCategory } = require("../models/SubCategory");
const { validateLearnerForUpdate } = require("./RouteValidation/Learner");
const {sendEmail} = require("./Helper/SendEmail");
const {validateFeedBackId} = require("./RouteValidation/FeedBack");
const { validate } = require("joi");
const auth = require("../middleware/auth");

/* For registration of Learner and sending him an email*/
router.post("/", async (req, res) => {
  try{
    const { error } = validateLearner(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    let learner = await Learner.findOne({
      userName: req.body.userName,
    });
    if (learner)
      return res.status(400).send({
        field: {
          name: "userName",
          message: "UserName already Exist",
        },
      });

    for (subCategory of req.body.favouriteSubCategories) {
      if (!(await SubCategory.findById(subCategory)))
        return res.status(400).send({
          field: {
            name: "subCategoryId",
            message: "SubCategory Id is not valid",
          },
        });
    }
 
    learner = await User.findOne({
      email: req.body.email,
    });
    if (learner){
      return res.status(400).send({
        field: {
          name: "email",
          message: "Email already Exist",
        },
      });
    }

    let { email, password, ...learnerData } = req.body;
    learner = await new Learner(learnerData).save();
    let user = await new User({
      email,
      password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      learnerId: learner._id,
    }).save();
    const token = user.generateAuthToken(learner._id, learner.name, learner.userName);
    await sendVerificationEmail(email, token, req.get('origin'));
    res.status(200).send({
      field: {
        message: "An Email has been sent. Please verify your account",
        name: "successful",
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

router.put("/", auth,  async (req, res) => {
  try {
    const { error } = validateLearnerForUpdate(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });
    let { _id, ...learner } = req.body;
    const updatedLearner = await Learner.updateOne({ _id: _id }, learner);
    res.send({
      field: {
        name: "successful",
        message: "Successfully updated",
        data: updatedLearner,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

router.put("/verified",  async (req, res) => {
  try{
    const { error } = validateFeedBackId(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });
      const {_id} = req.body;
      console.log(_id);
    const updatedUser = await User.updateOne({ learnerId: _id }, {verified:new Date()});
    console.log(_id);
    const user = await User.findOne({ learnerId: _id }).populate({
      path: "learnerId",
      select: "-counter -__v",
      populate: { path: "favouriteSubCategories", select: "-__v" },
    })
    .select("-__v");
     return res.send({
      field: {
        name: "successful",
        message: "Successfully Verified",
        data: user,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected", error:error },
    });
  }
});

async function sendVerificationEmail(email, token, origin) {
  let message;
  if (origin) {
      const verifyUrl = `${origin}/account/verify-email/${token}`;
      message = `<p>Please click the below link to verify your email address:</p>
                 <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
  } else {
      message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                 <p><code>${token}</code></p>`;
  }

  await sendEmail({
      to: email,
      subject: 'Pak Student Forum - Verify Email',
      html: `<h4>Verify Email</h4>
             <p>Thanks for registering!</p>
             ${message}`
  });
}

module.exports = router;
