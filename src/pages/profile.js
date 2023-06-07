import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Profile = () => {
  const { logoutHandler } = useContext(AuthContext);
  return (
    <div>
      <h2>Profile</h2>
      <button onClick={logoutHandler}>Log Out</button>
    </div>
  );
};
