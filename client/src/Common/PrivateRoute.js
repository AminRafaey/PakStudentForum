import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function PrivateRoute({ children, userType, ...rest }) {
  let user = null;
  if (localStorage.getItem("token")) {
    user = jwtDecode(localStorage.getItem("token"));
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.type === userType ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
