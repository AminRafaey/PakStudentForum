require('express-async-errors');
const express = require('express');
var path = require('path');
const Mcq = require("../routes/Mcq");
const FeedBack = require("../routes/FeedBack");
const SubCategory = require("../routes/SubCategory");
const Category = require("../routes/Category");
const Learner = require("../routes/Learner");
const DailyTest = require("../routes/DailyTest")
const Auth = require("../routes/Auth");
const Home = require("../routes/Home")

const error = require('../middleware/error');


module.exports = function(app) {
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../public')));
  
  app.use("/mcq", Mcq);
  app.use("/feedBack", FeedBack);
  app.use("/subCategory", SubCategory);
  app.use("/category", Category);
  app.use("/learner", Learner);
  app.use("/dailyTest", DailyTest);
  app.use("/auth", Auth);
  app.use("/home", Home);
  app.use(error);
}