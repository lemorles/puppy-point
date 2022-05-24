import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
// import { getAuth } from "../utils/auth";

export default function PublicPrivateRoute({
  path,
  component: Component,
  ...rest
}) {
  console.log("public");
  let { user } = useContext(UserContext);
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) => {
        // const auth = getAuth();

        if (!user) return <Redirect to={{ pathname: "/login" }} />;

        if (user && user.status === "active")
          return <Redirect to={{ pathname: "/" }} />;

        return <Component {...props} />;
      }}
    />
  );
}
