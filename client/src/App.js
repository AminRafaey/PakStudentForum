import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import AccountIndex from "./Account/AccountIndex";
import AdminRoutes from "./AdminRoutes";
import PublicRoutes from "./PublicRoutes";
import Spinner from "./UIHandlers/Spinner";


function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(jwtDecode(localStorage.getItem("token")));
    }
  }, []);

  //experiment mode
  // return(
  //   <div style={{backgroundColor: "#EEEEEE"}}>
  //   <Spinner />
  //   </div>
  // )
  if (user && user.type === "Admin") {
    return <AdminRoutes user={user} />;
  }
  return (
    <Router>
    {console.log(user)}
      <Switch>
        <Route path="/account">
          <AccountIndex setUser={setUser} />
        </Route>
        <Route path="/">
          <PublicRoutes user={user} setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
