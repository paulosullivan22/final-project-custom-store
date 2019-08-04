import React from "react";
import { Route, Redirect } from "react-router-dom";

// creates routes for protected areas of the site
// passes through user information if logged in or redirects if not logged in
const ProtectedRoute = ({
  component: Component,
  user,
  path,
  redirectPath = "/",
  ...rest
}) => {
  return (
    <Route
      path={path}
      render={props => {
        return user ? (
          <Component {...props} {...rest} user={user} />
        ) : (
          <Redirect to={redirectPath} />
        );
      }}
    />
  );
};

export default ProtectedRoute;