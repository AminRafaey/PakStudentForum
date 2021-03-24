import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";

function AccountIndex() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/verify-email/:token`} component={VerifyEmail} />
    </Switch>
  );
}

export default AccountIndex;
