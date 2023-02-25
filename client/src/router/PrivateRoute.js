import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuth = useSelector((state) => state.auth.token);

  const token = localStorage.getItem("token");

  return token || isAuth ? <Outlet /> : <Navigate to="/" />;
};
