import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Error404 from "./pages/Error404";
import { allowedRoutes } from "./routes";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import PostPage from "./pages/PostPage";
import PostDetailPage from "./pages/PostDetailPage";
import WalksPage from "./pages/WalksPage";
import WalkDetailPage from "./pages/WalkDetailPage";
import { ToastContextProvider } from "./context/ToastContext";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupGoogle from "./pages/SignupGoogle";
import PublicPrivateRoute from "./routes/PublicPrivateRoute";
import { getLatLng, getLocation } from "./utils/location";
import { setLatLng, setLocation, setPlaceId } from "./actions/locationActions";
import CustomDrawer from "./components/Notifications";
import UserContext from "./context/UserContext";
import { decodeToken, getToken } from "./utils/auth";

export default function App() {
  const { isOpenDrawer } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { lat } = useSelector((state) => state.location);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const latLong = await getLatLng();
        const location = await getLocation(latLong);

        if (latLong) dispatch(setLatLng(latLong, location));
        // dispatch(setLocation(location));
        if (latLong) dispatch(setPlaceId(location.placeId));
      } catch (err) {
        dispatch(setLatLng({ lat: null, lng: null }));
        dispatch(setPlaceId(null));
        dispatch(
          setLocation({
            city: null,
            province: null,
            country: null,
            compound: null,
          })
        );
      }
    };

    fetchLocation();
  }, [dispatch, lat]);

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const checkLoggedIn = () => {
      let token = getToken();

      if (token) {
        const decoded = decodeToken(token);
        setUser(decoded);
      }
    };
    console.log("user");
    checkLoggedIn();
  }, []);
  console.log(user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ToastContextProvider>
        <BrowserRouter>
          <Switch>
            {/* Rutas publicas */}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/posts" component={PostPage} />
            <Route exact path="/posts/:id" component={PostDetailPage} />
            <Route exact path="/walks" component={WalksPage} />
            <Route exact path="/walks/:id" component={WalkDetailPage} />
            <Route exact path="/signup" component={SignupPage} />
            <PublicPrivateRoute
              exact
              path="/account/missing-information"
              component={SignupGoogle}
            />
            {/* Rutas privadas */}
            {allowedRoutes.map((route) => {
              return (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                  requiredRoles={route.requiredRoles}
                  // user={user}
                />
              );
            })}
            <Route
              exact
              path="/password/reset/:id"
              component={ResetPasswordPage}
            />
            <Route
              exact
              path="/password/reset/"
              component={ForgotPasswordPage}
            />
            <PublicRoute exact path="/login" component={LoginPage} />

            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
        <CustomDrawer isOpen={isOpenDrawer} />
      </ToastContextProvider>
    </UserContext.Provider>
  );
}
