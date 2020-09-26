import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

function Common(props) {
  const [selectedCategory, setSelectedCategory] = useState({name:"", _id:"", subCategories:[""]});
  useEffect(()=>console.log("Reload"),[props]
  )
  return (
    <div className="fluid-container">
    <div className = "row">
    
    {selectedCategory.name.length >0 ? (
        <SideBar
          selectedCategory={selectedCategory}
          subCategories={props.subCategories}
          setMcqInitVal={props.setMcqInitVal}
        />
      ) : null}
      
      
      <Header
        subCategories={props.subCategories}
        setSubCategories={props.setSubCategories}
        categories={props.categories}
        setCategories={props.setCategories}
        setSelectedCategory={setSelectedCategory}
      />
      </div>
      
    </div>
  );
}

export default Common;
