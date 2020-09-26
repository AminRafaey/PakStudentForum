import React, { useState, useEffect } from "react";
import "./LAPSideBar.css";
import {fetchMcq} from "../../../Services/Mcq";
export default function SideBar(props) {
  const {LAPCount, subCategoryId,setMcqs, setLAPCount} = props;
  let btn = [];
  for (let c1 = 0; c1 < LAPCount; c1++) {
    if (c1 + 10 <= LAPCount) {
      btn.push(
        <a key={c1} onClick={()=>fetchMcq(subCategoryId, 10, (c1/ 10)+1, setMcqs, false, setLAPCount)}>
          {c1} -- {c1+10}
        </a>
      );
      c1 = c1 + 9;
    } else {
      btn.push(
          <a key={c1} onClick={()=>fetchMcq(subCategoryId, 10, (c1/ 10)+1, setMcqs, false, setLAPCount)}>
          {c1} -- {LAPCount}
</a>        
      );
      break;
    }
  }

  // useEffect(() => {
  //   function handleResize() {
  //     console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
  //     if (window.innerWidth < 1000) {
  //       document
  //         .getElementsByClassName("LAPnavbar-collapse")
  //         .classList.add("collapse");
  //     } else {
  //       document
  //         .getElementsByClassName("LAPnavbar-collapse")
  //         .classList.remove("collapse");
  //     }
  //   }
  //   window.addEventListener("resize", handleResize);
  // }, [window.onresize]);

  return (
    <div style={{ position: "sticky", top: "5rem" }}>
      <nav className="navbar navbar-light">
        {
        //   <button
        //   className="LAPnavbar-toggler"
        //   type="button"
        //   data-toggle="collapse"
        //   data-target="#LAPnavbarSupportedContent"
        //   aria-controls="LAPnavbarSupportedContent"
        //   aria-expanded="false"
        //   aria-label="Toggle navigation"
        // >
        //   <span className="navbar-toggler-icon"></span>
        // </button>
        }

    <div className="navbar-collapse LAPnavbar-collapse" id="LAPnavbarSupportedContent">
      <div className="LAPvertical-menu">{btn}</div>
    </div>
      </nav>
    </div>
  );
}
