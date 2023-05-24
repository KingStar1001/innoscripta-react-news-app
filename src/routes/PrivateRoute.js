import { Navigate, Outlet } from "react-router-dom";

import AuthUser from "../hooks/AuthUser";

const PrivateRoute = () => {
  const { getToken } = AuthUser();

  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
