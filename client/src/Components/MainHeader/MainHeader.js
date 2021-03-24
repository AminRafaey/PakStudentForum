// import React, { useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./Header.css";
// import jwtDecode from "jwt-decode";
// import SideBar from "../Common/SideBar/SideBar";
// import { fetchSubCategories } from "../../Services/FetchSubCategories";
// import { fetchCategories } from "../../Services/FetchCategories";
// import Spinner from "../../UIHandlers/Spinner";
// import NavBar from "../../Admin/Navbar";

// export default function Header(props) {
  // let {
  //   user,
  //   selectedCategory,
  //   subCategories,
  //   categories,
  //   setCategories,
  //   setHomeMcqs,
  //   setSubCategories,
  //   setSelectedCategory,
  // } = props;

  // const [open, setOpen] = React.useState(true);

  // useEffect(() => {
  //   if (!(subCategories.length > 1) || !(categories.length > 1)) {
  //     console.log("fetching");
  //     fetchCategories(categories).then((res) => {
  //       console.log("fetch categories=>", res);
  //       setCategories(res.categories);
  //       setHomeMcqs(res.mcqs);
  //       fetchSubCategories(subCategories)
  //         .then((res) => {
  //           setSubCategories(res);
  //           console.log("Categories=>",categories);
  //         })
  //         .then((res) => setSelectedCategory(categories[0]));
  //     });
  //     console.log("selectedCategory => ",selectedCategory);
  //   }
  // }, [selectedCategory, subCategories, categories]);

  // if (user && user.type === "Admin") {
  //   return (
  //     <NavBar
  //       selectedCategory={selectedCategory}
  //       subCategories={subCategories}
  //       user={user}
  //     />
  //   );
  // }
//   return (
//     <div
//       className="header_main"
//       style={{ position: "sticky", top: "0px", zIndex: "1" }}
//     >
//       <nav className="navbar-light bg-light">
//         <div className="row">
//           <div
//             className="nav-link col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex"
//             style={{}}
//           >
//             <span style={{ cursor: "pointer" }}>
//               {" "}
              // {selectedCategory.name.length > 0 ? (
              //   <SideBar
              //     selectedCategory={selectedCategory}
              //     subCategories={subCategories}
              //   />
              // ) : (
              //   <Spinner open={open} setOpen={setOpen} />
              // )}
//             </span>
//             <NavLink to="/" style={{ color: "#212529" }}>
//               <span
//                 className="h4"
//                 style={{
//                   cursor: "pointer",
//                   textDecoration: "none",
//                   marginLeft: "2rem",
//                 }}
//               >
//                 PakStudentForum
//               </span>
//             </NavLink>
//           </div>
//           <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6" style={{}}>
//             <div className="row">
//               <div className="col-sm-0 col-md-0 col-lg-0 col-xl-1"></div>
//               <div
//                 className="nav-link col-sm-4 col-md-4 col-lg-4 col-xl-4"
//                 style={{ cursor: "pointer" }}
//               >
//                 <NavLink
//                   to={`/addSuggestion`}
//                   style={{ color: "#212529" }}
//                 >
//                   <i className="fas fa-plus-circle"></i>Add Suggestion
//                 </NavLink>
//               </div>
//               <div
//                 className="nav-link col-sm-4 col-md-4 col-lg-4 col-xl-3"
//                 style={{ cursor: "pointer" }}
//               >
//                 <NavLink
//                   to="/dailyTest"
//                   style={{ color: "#212529" }}
//                 >
//                   <i className="fas fa-poll"></i>Daily Test
//                 </NavLink>
//               </div>
//               <div className=" col-sm-4 col-md-4 col-lg-4 col-xl-3">
//                 <div className="col-sm-0 col-md-0 col-lg-0 col-xl-1"></div>
//                 <span
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   id="navbarDropdownMenuLink"
//                   role="button"
//                   data-toggle="dropdown"
//                   aria-haspopup="true"
//                   aria-expanded="false"
//                 >
//                   <i className="fas fa-user"></i>{" "}
              //     {localStorage.getItem("token")
              //       ? jwtDecode(localStorage.getItem("token")).name
              //       : "My Account"}
              //   </span>
              //   <div
              //     className="dropdown-menu"
              //     aria-labelledby="navbarDropdownMenuLink"
              //   >
              //     {localStorage.getItem("token") ? (
              //       <li
              //         className="dropdown-item"
              //         key="login"
              //         style={{ cursor: "pointer" }}
              //         onClick={logOut}
              //       >
              //         LogOut
              //       </li>
              //     ) : (
              //       <li
              //         className="dropdown-item"
              //         key="login"
              //         style={{ cursor: "pointer" }}
              //       >
              //         <Link
              //           to={`/login`}
              //           style={{ color: "#212529" }}
              //         >
              //           {" "}
              //           Login
              //         </Link>
              //       </li>
              //     )}
              //     {localStorage.getItem("token") ? (
              //       ""
              //     ) : (
              //       <li
              //         className="dropdown-item"
              //         key="Register"
              //         style={{ cursor: "pointer" }}
              //       >
              //         <Link
              //           to={`/register`}
              //           style={{ color: "#212529" }}
              //         >
              //           {" "}
              //           Register
              //         </Link>
              //       </li>
              //     )}
              //   </div>
              // </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export function logOut() {
//   localStorage.removeItem("token");
//   window.location = "/";
// }

import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import SideBar from "../Common/SideBar/SideBar";
import { fetchSubCategories } from "../../Services/FetchSubCategories";
import { fetchCategories } from "../../Services/FetchCategories";
import Spinner from "../../UIHandlers/Spinner";
import NavBar from "../../Admin/Navbar";

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import "./Header.css";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header(props) {
  let {
    user,
    selectedCategory,
    subCategories,
    categories,
    setCategories,
    setHomeMcqs,
    setSubCategories,
    setSelectedCategory,
  } = props;

  const [open, setOpen] = React.useState(true);


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    if (!(subCategories.length > 1) || !(categories.length > 1)) {
      console.log("fetching");
      fetchCategories(categories).then((res) => {
        console.log("fetch categories=>", res);
        setCategories(res.categories);
        setHomeMcqs(res.mcqs);
        fetchSubCategories(subCategories)
          .then((res) => {
            setSubCategories(res);
            console.log("Categories=>",categories);
          })
          .then((res) => setSelectedCategory(categories[0]));
      });
      console.log("selectedCategory => ",selectedCategory);
    }
  }, [selectedCategory, subCategories, categories]);

  if (user && user.type === "Admin") {
    return (
      <NavBar
        selectedCategory={selectedCategory}
        subCategories={subCategories}
        user={user}
      />
    );
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    {localStorage.getItem("token") ? (
      <MenuItem onClick={()=>{
        handleMenuClose();
        logOut();
      }}>LogOut</MenuItem>
    ) : (
      <MenuItem onClick={handleMenuClose}><Link
          to={`/login`}
        >
          Login
        </Link></MenuItem>
    )}
    {localStorage.getItem("token") ? (
      ""
    ) : (
      <MenuItem onClick={handleMenuClose}> <Link
          to={`/register`}
        >
          {" "}
          Register
        </Link>
        </MenuItem>
    )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <Link to={`/addSuggestion`}>
      <p className="h6" style={{color:"#727273"}}>
      Add Suggestion
    </p>
    </Link>
      </MenuItem>
      <MenuItem>
      <Link to="/dailyTest">
            <p className="h6" style={{color:"#727273"}}>
            Daily Test
          </p>
          </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        
        <p className="h6" style={{color:"#727273"}}>
            Profile
          </p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} style={{ position: "sticky", top: "0px", zIndex: "1" }}>
      <AppBar position="static" style={{backgroundColor:"#F8F9FA"}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
          {selectedCategory && selectedCategory.name.length > 0 ? (
            <SideBar
              selectedCategory={selectedCategory}
              subCategories={subCategories}
            />
          ) : (
            <Spinner open={open} setOpen={setOpen} />
          )}      
          </IconButton>
         <Link to="/">
          <Typography className={classes.title} variant="h6" noWrap style={{color:"black"}}>
            PakStudentForum
          </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton >
            <Link to={`/addSuggestion`}>
            <Typography className={classes.title} variant="h6" noWrap style={{color:"#727273"}}>
            <i className="fas fa-plus-circle"></i>Add Suggestion
          </Typography>
          </Link>
            </IconButton>
            <IconButton>
            <Link to="/dailyTest">
            <Typography className={classes.title} variant="h6" noWrap style={{color:"#727273"}}>
            <i className="fas fa-poll"></i>Daily Test
          </Typography>
          </Link>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >

            {localStorage.getItem("token")
            ?  <Typography className={classes.title} variant="h6" noWrap style={{color:"#727273"}}>
            {jwtDecode(localStorage.getItem("token")).name}</Typography>

            : ""} <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export function logOut() {
  localStorage.removeItem("token");
  window.location = "/";
}