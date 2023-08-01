import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
      <Link to="/" className="home">
        <img src={headerLogo} className="header-logo" />
      </Link>

      <div className="search-wrap">
        <div className="search-box">
          <div className="search-icon">
            <i className="bi bi-search"></i>
          </div>
          <input
            placeholder="Search By Book Title..."
            className="search-bar"
            onChange={(e) => {
              productdispatch({ type: "search", payload: e.target.value });
            }}
            value={productState.search}
            onKeyDown={page && handleKey}
          />
        </div>
      </div>

      <div className="nav-links">
        <div>
          <NavLink
            to="/wishList"
            className={({ isActive }) =>
              isActive ? "active" : "wishList-navbar"
            }
          >
            {/* WishList */}
            <i className="bi bi-heart"></i>
            {/* ({wishListState.length}) */}
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : "cart-navbar")}
          >
            {/* Cart */}
            <i className="bi bi-cart2"></i>
            {/* ({cartState.length}) */}
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "active" : "profile-navbar"
            }
          >
            <i className="bi bi-person-circle"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
