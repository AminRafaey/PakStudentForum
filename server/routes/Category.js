const express = require("express");
const router = express.Router();
const { Category, validateCategory } = require("../models/Category");
const { validateCategoryUpdate } = require("./RouteValidation/Category");
const isAdmin = require("../middleware/isAdmin.js");
const auth = require("../middleware/auth");

router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    let category = await Category.findOne({
      name: req.body.name,
    });
    if (category)
      return res.status(400).send({
        field: {
          name: "Category",
          message: "Category already Exist",
        },
      });

    category = await new Category(req.body).save();
    res.status(200).send({
      field: {
        message: "Successfully Registered",
        data: category,
        name: "successful",
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});
// Not right if want to use it make it correct first as validateCategoryId is not define
// router.delete("/", async (req, res) => {
//   try {
//     const { error } = validateCategoryId(req.body);
//     if (error)
//       return res.status(400).send({
//         field: {
//           message: error.details[0].message,
//           name: error.details[0].path[0],
//         },
//       });
//     const category = await Category.findByIdAndDelete(req.body._id);
//     res.send({
//       field: {
//         name: "successful",
//         message: "Successfully Deleted",
//         data: category,
//       },
//     });
//   } catch (error) {
//     res.status(500).send({
//       field: { message: "Unexpected error occured", name: "unexpected" },
//     });
//   }
// });

router.put("/",  auth, isAdmin, async (req, res) => {
  try {
    const { error } = validateCategoryUpdate(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });
    let { _id, ...category } = req.body;
    const updatedCategory = await Category.updateOne({ _id: _id }, category);
    res.send({
      field: {
        name: "successful",
        message: "Successfully updated",
        data: updatedCategory,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

router.get("/", async (req, res)=>{
  try {
    res.status(200).send({
      field: {
        name: "successful",
        message: "Successfully Fetched",
        data: await Category.find().select("-__v"),
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
}})


module.exports = router;
