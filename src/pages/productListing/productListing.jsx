import { useContext, useState } from "react";

import { ProductContext } from "../../context/productContext";
import { CartContext } from "../../context/cartContext";
import { WishListContext } from "../../context/wishListContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NavBar } from "../../components/navigation/navigation";
import "./productListing.css";
import { FilterPane } from "../../components/filterPane/filterPane";

export const ProductList = () => {
  const { data, productState, productdispatch } = useContext(ProductContext);
  const { getcart, updateCart, cartdetails } = useContext(CartContext);
  const { updateWishlist, wishlistdata } = useContext(WishListContext);
  const { userlogin, authState, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const info = data();

  return (
    <div>
      <NavBar />
      <div className="productListing">
        <FilterPane />

        <div className="products">
          {info.map((item) => {
            const {
              _id,
              title,
              author,
              price,
              categoryName,
              rating,
              url,
              cart,
              wishList,
            } = item;
            return (
              <div key={_id} className="product-card">
                <img
                  src={url}
                  width="200px"
                  height="200px"
                  alt={title}
                  onClick={() => navigate(`/products/${_id}`)}
                />
                <p>
                  {title} By {author}
                </p>
                <p className="rating"> ★{rating} </p>
                <p className="price">₹{price}</p>

                <div className="buttons">
                  {/* {token
                    ? cartdetails.cart?.find((value) => value._id === _id)
                      ? navigate("/cart")
                      : updateCart(item)
                    : navigate("/login")} */}
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      if (token) {
                        if (
                          cartdetails.cart?.find((value) => value._id === _id)
                        ) {
                          navigate("/cart");
                        } else {
                          updateCart(item);
                          getcart();
                        }
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    {cartdetails.cart?.find(
                      (value) => value._id === _id && token
                    ) ? (
                      <Link to="/cart">Go To Cart</Link>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>

                  <button
                    className="add-to-wishlist-btn"
                    onClick={() => {
                      if (token) {
                        if (
                          wishlistdata?.wishlist?.find(
                            (value) => value._id === _id
                          )
                        ) {
                          console.log("in");
                          navigate("/wishList");
                        } else {
                          console.log("out");
                          updateWishlist(item);
                        }
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    {wishlistdata?.wishlist?.find(
                      (value) => value._id === _id
                    ) ? (
                      <Link to="/wishList">Go To Wishlist</Link>
                    ) : (
                      "Add to WishList"
                    )}
                  </button>

                  {/* {cartdetails.cart?.find((value) => value._id === _id) ? (
                    token == false ? (
                      <button
                        onClick={() => navigate("/login")}
                        className="add-button"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/cart")}
                        className="add-button"
                      >
                       
                        Go to Cart
                  
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        if (authState.currentUser) {
                          console.log("a");
                          updateCart(item);
                          getcart();
                        } else {
                          console.log("b");
                          navigate("/login");
                        }
                      }}
                      className="add-button"
                    >
                      Add to Cart
                    </button>
                  )} */}

                  {/* {wishlistdata?.wishlist?.find(
                    (value) => value._id === _id
                  ) ? (
                    token == false ? (
                      <button onClick={() => navigate("/login")}>
                        Add to WishList
                      </button>
                    ) : (
                      <button onClick={() => navigate("/wishList")}>
                        Go to WishList
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        if (authState.currentUser) {
                          updateWishlist(item);
                        } else {
                          navigate("/login");
                        }
                      }}
                      className="wishlist-button"
                    >
                      Add to WishList
                    </button>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
