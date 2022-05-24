import React, { useContext } from "react";
import HomeOwner from "../components/HomeOwner";
import HomeWalker from "../components/HomeWalker";
import HomeAdmin from "../components/HomeAdmin";
// import { getAuth } from "../utils/auth";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
// import { useSelector } from "react-redux";

export default function HomePage() {
  // const { role, status } = getAuth();
  // const { user } = useSelector((state) => state.user);
  const { user } = useContext(UserContext);

  if (user?.status === "inactive") {
    return <Redirect to={{ pathname: "/account/missing-information" }} />;
  }

  if (user?.role === "owner") return <HomeOwner />;

  if (user?.role === "walker") return <HomeWalker />;

  if (user?.role === "admin") return <HomeAdmin />;

  return null;
}
