import { createContext, useReducer, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [userlogin, setuserLogin] = useState();

  const login = async () => {
    const creds = {
      email: email,
      password: password,
    };

    try {
      const data = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(creds),
      });
      const response = await data.json();
      const { encodedToken, foundUser } = response;

      dispatch({ type: "userData", data: foundUser });

      localStorage.setItem("token", encodedToken);

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const signup = async () => {
    const userDetails = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    try {
      if (password === confirmPassword) {
        console.log(userDetails);
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify(userDetails),
        });
        const data = await response.json();

        const { encodedToken, createdUser } = data;
        // console.log(encodedToken, createdUser);
        // localStorage.setItem("token", encodedToken);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loginHandler = () => {
    if (userData) {
      setuserLogin(true);
    }
  };

  const logoutHandler = () => {
    localStorage.setItem("token", false);
    setuserLogin(false);
  };

  const dataHandler = (state, action) => {
    if (action.type === "userData") {
      return action.data;
    }
  };
  const [userData, dispatch] = useReducer(dataHandler, []);
  // console.log(userData);
  return (
    <AuthContext.Provider
      value={{
        setEmail,
        setPassword,
        setFirstName,
        setLastName,
        setConfirmPassword,
        login,
        signup,
        loginHandler,
        logoutHandler,
        userlogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
