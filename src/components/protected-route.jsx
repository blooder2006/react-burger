import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ onlyUnAuth = false, element }) => {
  const { userProfile } = useSelector((store) => store.profileReducer);
  const location = useLocation();

  if (onlyUnAuth && userProfile) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !userProfile) {
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }

  if (location.pathname === "/reset-password" && !location.state?.fromForgot) {
    return (
      <Navigate
        to={{ pathname: "/forgot-password", state: { from: location } }}
      />
    );
  }

  return element;
};

ProtectedRoute.propTypes = {
  onlyUnAuth: PropTypes.bool,
  element: PropTypes.element,
};