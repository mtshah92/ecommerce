import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export const RequireAuth = ({ children }) => {
  const { userlogin, authState } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("encodedToken");
  // console.log(token);
  // login !== "false"
  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};
