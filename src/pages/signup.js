import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const SignUp = () => {
  const {
    setEmail,
    setPassword,
    setConfirmPassword,
    setFirstName,
    setLastName,
    // signUpHandler,
    signup,
  } = useContext(AuthContext);
  return (
    <div>
      <div>
        <label for="email">
          Email:{" "}
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label for="firstName">
          First Name:{" "}
          <input
            type="text"
            id="firstName"
            onClick={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label for="lastName">
          Last Name:{" "}
          <input
            type="text"
            id="lastName"
            onClick={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label for="password">
          Password:{" "}
          <input
            type="password"
            id="password"
            onClick={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label for="confirmPassword">
          Confirm Password:{" "}
          <input
            type="password"
            id="confirmPassword"
            onClick={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>
      <button
        onClick={() => {
          // signUpHandler();
          signup();
        }}
      >
        Create New Account
      </button>
    </div>
  );
};
