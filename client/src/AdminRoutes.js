import React, { useState} from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import MainHeader from "./Components/MainHeader/MainHeader";
import ReadMcq from "./Admin/ReadMcq";
import UI from "./Admin/AddMcq/UI";
import Suggestion from "./Admin/Suggestion";
import Header from "./Components/Common/Header/Header";
import Problem from "./Admin/Problem";
import { UI as AddCatAndSub } from "./Admin/AddCat&SubCat/UI";
import PrivateRoute from "./Common/PrivateRoute";
import Home from "./Components/Home/Home";


function AdminRoutes(props) {
  const { user } = props;
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
  const [mcqInitVal, setMcqInitVal] = useState("");
  return (
    <div className="fluid-container">
      <Router>
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
          <PrivateRoute path="/admin/readMcq/:subCategoryId" user={user} userType={"Admin"}>
                  <ReadMcq setMcqInitVal={setMcqInitVal} />
          </PrivateRoute>
          <PrivateRoute path="/admin/addMcq"  user={user} userType={"Admin"}>
            <UI
              subCategories={subCategories}
              setSubCategories={setSubCategories}
              mcqInitVal={mcqInitVal}
              setMcqInitVal={setMcqInitVal}
              categories={categories}
            />
          </PrivateRoute>
          <PrivateRoute path="/admin/suggestion"  user={user} userType={"Admin"}>
            <Suggestion setMcqInitVal={setMcqInitVal} />
          </PrivateRoute>
          <PrivateRoute path="/admin/problem" user={user} userType={"Admin"}>
            <Problem setMcqInitVal={setMcqInitVal} />
          </PrivateRoute>

          <PrivateRoute path="/admin/addCatAndSub" user={user} userType={"Admin"}>
            <AddCatAndSub
              subCategories={subCategories}
              setSubCategories={setSubCategories}
              categories={categories}
              setCategories={setCategories}
            />
          </PrivateRoute>
          <PrivateRoute path="/" user={user} userType={"Admin"}>
           <Header
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
            <Home categories={categories} homeMcqs={homeMcqs} />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default AdminRoutes;
