import React from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

import "./Card.css";

export default function Card(props) {
  const { category, setSelectedCategory, setCategoryInitVal } = props;

  return (
    <div
      className="slickSlider-Card"
     
    >
      <h5 className="d-flex justify-content-start">{category.name}</h5>
      <p className="d-flex justify-content-center">{category.description}</p>
     <div className="d-flex justify-content-center"> <button type="button" className="btn btn-success"  onClick={() => {
        setSelectedCategory(category);
        document.getElementById("toggleDrawer").click();
      }}>
        Learn!
      </button></div> <div className="d-flex justify-content-center m-1">
      {localStorage.getItem("token") && jwtDecode(localStorage.getItem("token")).type === "Admin" ? (
        <Link to="/admin/addCatAndSub">
          <button
            type="button"
            className="btn btn-success ml-2"
            onClick={() =>{
              setCategoryInitVal({
                _id: category._id,
                name: category.name,
                description: category.description,
                subCategories: category.subCategories,
              }
              )
              
            }
        }
          >
            Edit
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
    </div> 
  );
}
