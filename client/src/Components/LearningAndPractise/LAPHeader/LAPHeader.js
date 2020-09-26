import React from 'react';
import "./LAPHeader.css";
import {useRouteMatch, NavLink} from "react-router-dom"

export default function LAPHeader(props) {
  let {origin} = props;
const {path, url}  = useRouteMatch();
  return (
    <div className="row" style={{marginTop:"2rem"}}>
    <div className = "col-lg-4 col-md-4 col-sm-6 col-xs-12">
    <NavLink to={`/reading/${url.slice(1).split("/")[1]}`}><button className="LAP_btn">Reading Mode</button></NavLink>
    </div>
    <div className = "col-lg-4 col-md-4 col-sm-6 col-xs-12">
   <NavLink to={`/learning/${url.slice(1).split("/")[1]}`}> <button className="LAP_btn">Learning Mode</button></NavLink>
    </div>
    <div className = "col-lg-4 col-md-4 col-sm-6 col-xs-12">
    <NavLink to={`/practise/${url.slice(1).split("/")[1]}`}> <button className="LAP_btn">Practise Mode</button></NavLink>
     </div>
    </div>
  );
};