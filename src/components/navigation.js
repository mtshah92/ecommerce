import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import "./navigation.css";
import { WishListContext } from "../context/wishListContext";
import { CartContext } from "../context/cartContext";

export const NavBar = () => {
  const { cartState } = useContext(CartContext);
  const { wishListState } = useContext(WishListContext);
  return (
    <div className="navigation-bar">
      <NavLink to="/" className="home">
        Home
      </NavLink>
      <input placeholder="search" className="search-bar" />
      <div className="nav-links">
        {/* <NavLink to="/products" className="products-navbar">
          Products
        </NavLink> */}
        <NavLink to="/wishList" className="wishList-navbar">
          WishList({wishListState.length})
        </NavLink>
        <NavLink to="/cart" className="cart-navbar">
          Cart({cartState.length})
        </NavLink>
        <NavLink to="/profile" className="profile-navbar">
          Profile{" "}
        </NavLink>
      </div>
    </div>
  );
};
