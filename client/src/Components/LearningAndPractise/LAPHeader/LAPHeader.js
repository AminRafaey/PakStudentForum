 import React from 'react';
 import "./LAPHeader.css";
import {useRouteMatch, NavLink} from "react-router-dom"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
  'Eazy',
  'Normal',
  'Difficult'
];

const ITEM_HEIGHT = 48;

export default function LAPHeader(props) {
  let {origin} = props;
const {path, url}  = useRouteMatch();
console.log(url);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = (option) => {
  setAnchorEl(null);
  console.log(option);
};

  return (
    <div className="row" style={{marginTop:"2rem"}}>
    <div className = "col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <NavLink to={`/reading/Eazy/${url.slice(1).split("/")[2]}`}><button className="LAP_btn">Reading Mode</button></NavLink>
    </div>
    <div className = "col-lg-3 col-md-4 col-sm-6 col-xs-12">
   <NavLink to={`/learning/Eazy/${url.slice(1).split("/")[2]}`}> <button className="LAP_btn">Learning Mode</button></NavLink>
    </div>
    <div className = "col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <NavLink to={`/practise/Eazy/${url.slice(1).split("/")[2]}`}> <button className="LAP_btn">Practise Mode</button></NavLink>
     </div>
     <div className = "col-lg-3 col-md-4 col-sm-6 col-xs-12">
  <button className="LAP_btn" onClick={handleClick}>Difficulty Level <MoreVertIcon /></button>
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: '20ch',
        },
      }}
    >
      {options.map((option) => (
        <NavLink to={`/${url.slice(1).split("/")[0]}/${option}/${url.slice(1).split("/")[2]}`}>  <MenuItem key={option} selected={option === 'Pyxis'} onClick={()=>handleClose(option)}>
          {option}
        </MenuItem>
        </NavLink>
     
      ))}
    </Menu>
  </div>
    </div>
  );
};






