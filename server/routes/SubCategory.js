const express = require("express");
const router = express.Router();
const { SubCategory, validateSubCategory } = require("../models/SubCategory");
const {
  validateSubCategoryId,
  validateSubCategoryUpdate,
} = require("./RouteValidation/SubCategory");
const { Learner } = require("../models/Learner");
const { Category } = require("../models/Category");
const { Mcq } = require("../models/Mcq");
const isAdmin = require("../middleware/isAdmin.js");
const auth = require("../middleware/auth");

router.post("/", auth,isAdmin, async (req, res) => {

    const { error } = validateSubCategory(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });
      
      
      let  alreadyExist= [];
      let subCategory=[];
      let temp = null;
for(name of req.body.name)
    {
      temp = await SubCategory.findOne({
        name: name,
      });
      console.log(temp);
      console.log(name);
      
      (temp?alreadyExist.push(temp):subCategory.push(await new SubCategory({name:name}).save()))
      temp = null;
    }
    
    res.status(200).send({
      field: {
        message: "Successfully Registered",
        data: subCategory,
        alreadyExist:alreadyExist,
        name: "successful",
      },
    });

});

router.delete("/", auth, isAdmin, async (req, res) => {
  try {
    const { error } = validateSubCategoryId(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });

    let response = await Learner.updateMany(
      {},
      { $pull: { favouriteSubCategories: req.body._id } }
    );
    response = await Category.updateMany(
      {},
      { $pull: { subCategories: req.body._id } }
    );
    response = await Mcq.updateMany(
      {},
      { $pull: { subCategories: req.body._id } }
    );
    const subCategory = await SubCategory.findByIdAndDelete(req.body._id);
    res.status(200).send({
      field: {
        name: "successful",
        message: "Successfully Deleted",
        data: subCategory,
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
  }
});

router.put("/", auth,isAdmin, async (req, res) => {
  try {
    const { error } = validateSubCategoryUpdate(req.body);
    if (error)
      return res.status(400).send({
        field: {
          message: error.details[0].message,
          name: error.details[0].path[0],
        },
      });
    let { _id, newName } = req.body;
    console.log({ _id, name: newName });

    const updatedSubCategory = await SubCategory.updateOne(
      { _id: _id },
      { _id, name: newName }
    );
    res.status(200).send({
      field: {
        name: "successful",
        message: "Successfully updated",
        data: updatedSubCategory,
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
        data: await SubCategory.find().select("name"),
      },
    });
  } catch (error) {
    res.status(500).send({
      field: { message: "Unexpected error occured", name: "unexpected" },
    });
}})

module.exports = router;
