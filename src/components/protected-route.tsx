import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../utils/interfaces-and-types";

interface IProtectedRouteProps {
  onlyUnAuth: boolean;
  element: React.ReactNode;
}

interface LocationState {
  from: {
    pathname: string;
  };
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  onlyUnAuth = false,
  element,
}) => {
  const { userProfile } = useSelector(
    (store: IRootState) => store.profileReducer
  );
  const location = useLocation();

  if (onlyUnAuth && userProfile) {
    const from = (location.state as LocationState)?.from || { pathname: "/" };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !userProfile) {
    return <Navigate to={{ pathname: "/login" }} state={{ from: location }} />;
  }

  if (location.pathname === "/reset-password" && !location.state?.fromForgot) {
    return (
      <Navigate
        to={{ pathname: "/forgot-password" }}
        state={{ from: location }}
      />
    );
  }

  return <>{element}</>;
};
