import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const { setEmail, setPassword, login, loginHandler } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const pageHandler = () => {
    navigate(location?.state?.from?.pathname);
  };
  return (
    <div className="login-card">
      <label for="email">Email Address</label>
      <input
        type="text"
        id="email"
        placeholder="adarshbalika@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="adarshbalika"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => {
          login();
          loginHandler();
          pageHandler();
        }}
      >
        Login
      </button>
      <h3>
        Don't have accout? <NavLink to="/signup">Signup</NavLink>
      </h3>
    </div>
  );
};
