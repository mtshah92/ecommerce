import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { WishListContext } from "../../context/wishListContext";
import { CartContext } from "../../context/cartContext";
import { ProductContext } from "../../context/productContext";
import headerLogo from "../../images/custoFriendLogo.png";

import "./navigation.css";

export const NavBar = ({ page }) => {
  // const { cartState } = useContext(CartContext);
  // const { wishListState } = useContext(WishListContext);
  const { search, setSearch } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleKey = (event) => {
    if (event.key === "Enter") {
      navigate("/products");
    }
  };
  return (
    <div className="navigation-bar">
      <NavLink to="/" className="home">
        <img src={headerLogo} className="header-logo" />
      </NavLink>
      {page ? (
        <input
          placeholder="search"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKey}
        />
      ) : (
        <input
          placeholder="search"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}
      <div className="nav-links">
        <NavLink to="/products" className="products-navbar">
          Products
        </NavLink>
        <NavLink to="/wishList" className="wishList-navbar">
          WishList
          {/* ({wishListState.length}) */}
        </NavLink>
        <NavLink to="/cart" className="cart-navbar">
          Cart
          {/* ({cartState.length}) */}
        </NavLink>
        <NavLink to="/profile" className="profile-navbar">
          Profile{" "}
        </NavLink>
      </div>
    </div>
  );
};
