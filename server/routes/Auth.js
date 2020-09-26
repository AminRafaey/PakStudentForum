const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    let user = await User.findOne({ email: req.body.email })
      .populate({
        path: "learnerId",
        select: "-counter -__v",
        populate: { path: "favouriteSubCategories", select: "-__v" },
      })
      .select("-__v");
    if(!user || (user && user.verified == null))
    {
      if(user && user.verified == null)
        return res.status(400).send({
        field: {
          email: "email",
          message: "Account is not verified",
        },
      })
      return res.status(400).send({
        field: {
          email: "email",
          message: "No User with this email exist",
        },
      })
    }

    let authentication = await bcrypt.compare(req.body.password, user.password);
    if (!authentication)
      return res.status(400).send({
        field: {
          message: "Invalid username or password",
        },
      });
      const token = user.generateAuthToken(user.learnerId._id, user.learnerId.name, user.learnerId.userName);
    res.header("x-auth-token", token).header("access-control-expose-headers", "x-auth-token").status(200).send({
      field: {
        message: "Successful",
        data: {type:user.type, _id:user.learnerId._id, name:user.learnerId.name, userName: user.learnerId.userName
        ,email:user.email },
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
