import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import "./login.css";
import { NavBar } from "../../components/navigation/navigation";
import { CartContext } from "../../context/cartContext";

export const Login = () => {
  const { loginHandler } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const pageHandler = () => {
    navigate(location?.state?.from?.pathname);
  };

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <NavBar />
      <div className="login-page">
        <div className="login-card">
          <h2>Login</h2>
          <div className="login-email">
            <label for="email">Email Address</label>
            <div className="login-email-input">
              <input
                className="login-input"
                type="text"
                id="email"
                value={loginCredentials.email}
                placeholder="test@gmail.com"
                onChange={(e) => {
                  setLoginCredentials({
                    ...loginCredentials,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="login-password">
            <label for="password">Password</label>
            <div className="login-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="test"
                value={loginCredentials.password}
                className="login-input"
                onChange={(e) => {
                  setLoginCredentials({
                    ...loginCredentials,
                    password: e.target.value,
                  });
                }}
              />
              {!showPassword ? (
                <i
                  class="bi bi-eye-slash-fill toggle-password"
                  onClick={() => setShowPassword(true)}
                ></i>
              ) : (
                <i
                  class="bi bi-eye-fill toggle-password"
                  onClick={() => setShowPassword(false)}
                ></i>
              )}
            </div>
          </div>
          <div className="login-btn-out">
            <button
              className="login-btn"
              onClick={() => {
                // login();
                loginHandler(loginCredentials);

                // pageHandler();
              }}
            >
              Login
            </button>
          </div>
          <div className="login-btn-out">
            <button
              className="login-btn"
              onClick={() => {
                setLoginCredentials({
                  email: "test@gmail.com",
                  password: "test",
                });
                loginHandler({ email: "test@gmail.com", password: "test" });

                // pageHandler();
              }}
            >
              Guest Mode
            </button>
          </div>
          <h3 className="login-text">Don't have account?</h3>
          <div className="login-signup">
            <NavLink to="/signup">Signup</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
