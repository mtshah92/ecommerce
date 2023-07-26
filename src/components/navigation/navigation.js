import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { WishListContext } from "../../context/wishListContext";
import { CartContext } from "../../context/cartContext";
import { ProductContext } from "../../context/productContext";
import headerLogo from "../../images/custoFriendLogo.png";

import "./navigation.css";

export const NavBar = ({ page }) => {
  const { cartState } = useContext(CartContext);
  const { wishListState } = useContext(WishListContext);
  const { search, setSearch, productState, productdispatch } =
    useContext(ProductContext);
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
          placeholder="Search By Book Title"
          className="search-bar"
          onChange={(e) => {
            // setSearch(e.target.value);
            productdispatch({ type: "search", payload: e.target.value });
          }}
          onKeyDown={handleKey}
        />
      ) : (
        <input
          placeholder="Search By Book Title"
          className="search-bar"
          onChange={(e) => {
            // setSearch(e.target.value);
            productdispatch({ type: "search", payload: e.target.value });
          }}
          value={productState.search}
        />
      )}
      <div className="nav-links">
        <NavLink to="/wishList" className="wishList-navbar">
          {/* WishList */}
          <i className="bi bi-heart"></i>
          {/* ({wishListState.length}) */}
        </NavLink>
        <NavLink to="/cart" className="cart-navbar">
          {/* Cart */}
          <i className="bi bi-cart2"></i>
          {/* ({cartState.length}) */}
        </NavLink>
        <NavLink to="/profile" className="profile-navbar">
          <i className="bi bi-person-circle"></i>
        </NavLink>
      </div>
    </div>
  );
};
