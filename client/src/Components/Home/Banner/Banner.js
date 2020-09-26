import React from 'react';
import {Link} from "react-router-dom";
import "./Banner.css"

export default function Banner(props) {
    let  {category, subCategoryId}=
        props;
      if(!(category)){
          category={name:"Dummy", description:"Hello there"}
        }
  return (
    <div className="banner">
    <div className="card banner_Card">
  
      <h2 className="card-title d-flex justify-content-center">{category.name}</h2>
      <br />
      <p className="card-subtitle mb-2 text-muted d-flex justify-content-center">{category.description}</p>
 <br />
 <button><Link to={`/learning/${subCategoryId}`} style={{color:"white"}}>Learn More!</Link></button>
  </div>      
    </div>
  );
};