import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import AccountIndex from "./Account/AccountIndex";
import AdminRoutes from "./AdminRoutes";
import PublicRoutes from "./PublicRoutes";
import Header from "./Components/MainHeader/MainHeader";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(jwtDecode(localStorage.getItem("token")));
    }
  }, []);

// return(
// <Header />
// )

  if (user && user.type === "Admin") {
    return <AdminRoutes user={user} />;
  }
  return (
    <Router>
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
