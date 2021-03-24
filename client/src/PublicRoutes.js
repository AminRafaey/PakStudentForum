import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Header from "./Components/Common/Header/Header";
import ReadingMode from "./Components/LearningAndPractise/Mcq/ReadingMode";
import AddSuggestion from "./Components/Forms/AddSuggestion/AddSuggestion";
import SignUp from "./Components/Forms/SignUp/SignUp";
import Login from "./Components/Forms/Login/Login";
import MainHeader from "./Components/MainHeader/MainHeader";
import PractiseMode from "./Components/LearningAndPractise/Practise/PractiseMode";
import LearningMode from "./Components/LearningAndPractise/LearningMode/LearningMode";
import DailyTest from "./Components/DailyTest/DailyTest";
import AccountIndex from "./Account/AccountIndex";
import PrivateRoute from "./Common/PrivateRoute";


function PublicRoutes(props) {
  const { user, setUser  } = props;
  const [subCategories, setSubCategories] = useState([{ _id: "", name: "" }]);
  const [categories, setCategories] = useState([
    { _id: "", name: "", subCategories: [""] },
  ]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
    _id: "",
    subCategories: [""],
  });
  const [homeMcqs, setHomeMcqs] = useState([]);
  return (
    <Router> 
          <div style={{backgroundColor:"#f2f2f2"}}>
          <MainHeader 
          user={user}
          subCategories={subCategories}
              setSubCategories={setSubCategories}
              categories={categories}
              setCategories={setCategories}
              setSelectedCategory={setSelectedCategory}
              setHomeMcqs={setHomeMcqs}
              selectedCategory={selectedCategory}
          />
            <Switch>
              <Route path="/account" >
                <AccountIndex />
              </Route>
              <PrivateRoute exact path="/addSuggestion" user={user} userType={"Learner"}>
                <AddSuggestion user={user} />
              </PrivateRoute>
              <Route exact path="/register" >
                <SignUp categories={categories}/>
              </Route>
              <Route exact path="/reading/:difficultyLevel/:subCategoryId">
                <ReadingMode user={user} subCategories={subCategories}/>
              </Route>
              <Route exact path="/learning/:difficultyLevel/:subCategoryId">
                <LearningMode user={user} subCategories={subCategories}/>
              </Route>
              <Route exact path="/practise/:difficultyLevel/:subCategoryId">
                <PractiseMode user={user} subCategories={subCategories} />
              </Route>
              <PrivateRoute exact path="/dailyTest" user={user} userType={"Learner"}>
                <DailyTest user={user} subCategories={subCategories} />
              </PrivateRoute>
              <Route exact path="/login">
                <Login setUser={setUser}/>
              </Route>
              <Route path="/">
              <Header
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
                <Home categories={categories} homeMcqs={homeMcqs} />
              </Route>
            </Switch>
        </div>
        </Router>
  );
}

export default PublicRoutes;
