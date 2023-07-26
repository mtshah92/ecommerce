import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavBar } from "../../components/navigation/navigation";

export const Profile = () => {
  const { logoutHandler, authState, user } = useContext(AuthContext);
  console.log(user);
  console.log("any");
  return (
    <div>
      <NavBar />
      <h2>Profile</h2>
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <button
        onClick={() => {
          logoutHandler();
          // localStorage.removeItem("encodedToken");
        }}
      >
        Log Out
      </button>
    </div>
  );
};
