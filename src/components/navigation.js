import "./navigation.css";

export const NavBar = () => {
  return (
    <div className="navigation-bar">
      <h3>Home</h3>
      <input placeholder="search" className="search-bar" />
      <button>Login</button>
      <h3>WishList</h3>
      <h3>Cart</h3>
    </div>
  );
};
