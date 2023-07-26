import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const initialState = {
    currentUser: [],
  };

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("encodedToken"))
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const authHandler = (state, action) => {
    switch (action.type) {
      case "login":
        return { ...state, currentUser: action.payload };
      case "signup":
        return { ...state, currentUser: action.payload };
      case "logout":
        return { ...state, currentUser: [] };
      default:
        return state;
    }
  };

  const loginHandler = async (credentials) => {
    try {
      const response = await axios.post("/api/auth/login", credentials, {});
      dispatch({ type: "login", payload: response.data.foundUser });
      setUser(response.data.foundUser);
      localStorage.setItem("user", JSON.stringify(response.data.foundUser));
      localStorage.setItem(
        "encodedToken",
        JSON.stringify(response.data.encodedToken)
      );
      setToken(response.data.encodedToken);
      toast.success("Login Successful");
      navigate("/");
    } catch (e) {
      toast.error(...e.response.data.errors);
      // console.log(e);
    }
  };

  const signupHandler = async (userData) => {
    try {
      const response = await axios.post("/api/auth/signup", userData, {});
      // console.log(response.data);
      dispatch({ type: "signup", payload: response.data.createdUser });
      setUser(response.data.createdUser);
      localStorage.setItem("user", JSON.stringify(response.data.createdUser));
      localStorage.setItem(
        "encodedToken",
        JSON.stringify(response.data.encodedToken)
      );
      setToken(response.data.encodedToken);
      toast.success("Signin Successful");
      navigate("/");
    } catch (e) {
      toast.error(...e.response.data.errors);
      // console.error(e);
    }
  };

  const logoutHandler = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("encodedToken");
    localStorage.removeItem("user");
    setUser();
    setToken();
    navigate("/login");
    toast.success("Logged Out");
  };

  // const login = async () => {
  //   const creds = {
  //     email: email,
  //     password: password,
  //   };

  //   try {
  //     const data = await fetch("/api/auth/login", {
  //       method: "POST",
  //       body: JSON.stringify(creds),
  //     });
  //     const response = await data.json();
  //     const { encodedToken, foundUser } = response;

  //     dispatch({ type: "userData", data: foundUser });

  //     localStorage.setItem("token", encodedToken);

  //     return response;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const signup = async () => {
  //   const userDetails = {
  //     email: email,
  //     password: password,
  //     firstName: firstName,
  //     lastName: lastName,
  //   };
  //   try {
  //     if (password === confirmPassword) {
  //       console.log(userDetails);
  //       const response = await fetch("/api/auth/signup", {
  //         method: "POST",
  //         body: JSON.stringify(userDetails),
  //       });
  //       const data = await response.json();

  //       const { encodedToken, createdUser } = data;
  //       // console.log(encodedToken, createdUser);
  //       // localStorage.setItem("token", encodedToken);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const loginHandler = () => {
  //   if (userData) {
  //     setuserLogin(true);
  //   }
  // };

  // const logoutHandler = () => {
  //   localStorage.setItem("token", false);
  //   setuserLogin(false);
  // };

  // const dataHandler = (state, action) => {
  //   if (action.type === "userData") {
  //     return action.data;
  //   }
  // };
  // const [userData, dispatch] = useReducer(dataHandler, []);
  const [authState, dispatch] = useReducer(authHandler, initialState);
  // console.log(authState);

  return (
    <AuthContext.Provider
      value={{
        authState,
        loginHandler,
        signupHandler,
        logoutHandler,
        token,
        user,
        // userlogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
