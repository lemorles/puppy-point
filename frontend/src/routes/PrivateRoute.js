import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "../components/Footer";
import UserContext from "../context/UserContext";
import Layout from "../layout/Layout";
import Error404 from "../pages/Error404";
import { getAuth } from "../utils/auth";
// import { getAuth } from "../utils/auth";

export default function PrivateRoute({
  path,
  component: Component,
  requiredRoles,
  exact,
  toogleMenu,
  open,
  ...rest
}) {
  console.log("private");

  // console.log(user);
  return (
    <Route
      exact={exact}
      {...rest}
      render={(props) => {
        // const { user } = useContext(UserContext);
        const auth = getAuth();

        // si el user no está logueado lo redireccionamos al login
        if (!auth) {
          return <Redirect to={{ pathname: "/login" }} />;
        }

        // verificamos que el user tenga permisos para acceder a la url
        if (requiredRoles.indexOf(auth.role) === -1) {
          console.log("entro");
          return <Redirect to={{ pathname: "/home" }} />;
        }

        // si la ruta no es exact renderizamos el component Error404
        if (!exact) return <Error404 />;

        // si todo va bien lo redireccionamos a la url solicitada
        return (
          <>
            <Layout toogleMenu={toogleMenu} open={open}>
              <Component {...props} />
            </Layout>
            <Footer />
          </>
        );
      }}
    />
  );
}
