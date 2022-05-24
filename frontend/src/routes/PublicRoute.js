import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuth } from "../utils/auth";

export default function PublicRoute({ path, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const auth = getAuth();

        if (auth) return <Redirect to={{ pathname: "/home" }} />;

        return <Component {...props} />;
      }}
    />
  );
}
