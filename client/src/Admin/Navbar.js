import React from "react";
import { Link, NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {logOut} from "../Components/MainHeader/MainHeader";
import SideBar from "../Components/Common/SideBar/SideBar";
import Spinner from "../UIHandlers/Spinner";
export default function Navbar(props) {
  const {selectedCategory,
  subCategories,
user}=props;
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{backgroundColor:"#EEEEEE"}}>
      <nav className="navbar navbar-expand-lg navbar-light">
      <p 
      style={{cursor:"pointer"}}>
       {" "}
       {selectedCategory.name.length > 0 ? (
         <SideBar
           selectedCategory={selectedCategory}
           subCategories={subCategories}
           user={user}
         />
       ) : (
         <Spinner  open={open} setOpen={setOpen}/>
       )}
     </p>
     <Link to="/" style={{ color: "#212529" }}>
     <span
       className="h6"
       style={{
         cursor: "pointer",
         textDecoration: "none",
         marginLeft: "0.5rem",
       }}
     >
       PakStudentForum
     </span>
   </Link>
        <div >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent"
        style={{ marginLeft:"35rem"}}>
          <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
              <Link className="nav-link" to="/" style={{ color: "#212529" }}>
                Home
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/admin/addMcq" style={{ color: "#212529" }}>
                Add Mcq
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/addCatAndSub" style={{ color: "#212529" }}>
                Cat&Sub-Cat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/suggestion" style={{ color: "#212529" }}>
                Suggestion
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/problem" style={{ color: "#212529" }}>
                FeedBack
              </Link>
            </li>
          </ul>
          <div   className="dropdown">
          <span
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
           style={{ color: "#212529" }}
        >
          <i className="fas fa-user"></i> {localStorage.getItem("token")?jwtDecode(localStorage.getItem("token")).name:"My Account"}
        </span>
        <div
          className="dropdown-menu"
          aria-labelledby="navbarDropdownMenuLink"
        >
            <li
              className="dropdown-item"
              key="login"
              style={{ cursor: "pointer" }}
              onClick={logOut}
            >
              LogOut
            </li>
            </div>
            </div>
        </div>
        </div>
      </nav>
    </div>
  );
}
