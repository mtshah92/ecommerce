import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavBar } from "../../components/navigation/navigation";
import "./signup.css";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

export const SignUp = () => {
  const { signupHandler, signup } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  return (
    <div>
      <NavBar />
      <div className="signup-page">
        <div className="signup-card">
          <h2>Signup</h2>
          <div>
            <label for="email">
              Email{" "}
              <div className="signup-email">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
              </div>
            </label>
          </div>
          <div>
            <label for="firstName">
              First Name{" "}
              <div className="signup-firstName">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  onChange={(e) => {
                    setUserData({ ...userData, firstName: e.target.value });
                  }}
                />
              </div>
            </label>
          </div>
          <div>
            <label for="lastName">
              Last Name{" "}
              <div className="signup-lastName">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setUserData({ ...userData, lastName: e.target.value });
                  }}
                />
              </div>
            </label>
          </div>
          <div>
            <label for="password">
              Password{" "}
              <div className="signup-password">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                />
              </div>
            </label>
          </div>
          <div>
            <label for="confirmPassword">
              Confirm Password{" "}
              <div className="signup-confirmPassword">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  // onClick={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="signup-out-create">
            <button
              className="signup-create"
              onClick={() => {
                signupHandler(userData);

                // signup();
              }}
            >
              Create New Account
            </button>
          </div>
          <div className="go-login">
            Already Have an Account <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
