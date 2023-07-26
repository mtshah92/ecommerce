import { useContext, useState } from "react";
import { WishListContext } from "../../context/wishListContext";
import { CartContext } from "../../context/cartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { NavBar } from "../../components/navigation/navigation";
import "./wishList.css";

export const WishList = () => {
  const { wishlistdata, removeFromWishList } = useContext(WishListContext);
  const { updateCart, getcart, cartdetails } = useContext(CartContext);
  const [cartButton, setCartButton] = useState("Add to cart");
  const navigate = useNavigate();
  return (
    <div>
      <NavBar page={"home"} />
      <div className="wishlist-page">
        <h2>WishList</h2>
        {wishlistdata?.wishlist?.length == false ? (
          <div className="wishlist-empty">
            <h2>Your Wishlist is Empty</h2>
            <button onClick={() => navigate("/products")}>
              Explore Products
            </button>
          </div>
        ) : (
          <div className="wishlist-product">
            {wishlistdata?.wishlist?.map((item) => {
              const { _id, title, author, categoryName, url, price } = item;
              return (
                <div key={_id} className="wishlist-each-product">
                  <div>
                    <img
                      src={url}
                      alt={title}
                      className="wishlist-product-img"
                    />
                  </div>
                  <div className="wishlist-part-product">
                    <h3>{title}</h3>
                    <p>Author: {author}</p>
                    <p>Category: {categoryName}</p>
                    <div className="wishlist-page-btn">
                      <button
                        onClick={() => {
                          if (
                            cartdetails?.cart?.find(
                              (value) => value._id === _id
                            )
                          ) {
                            setCartButton("Added to Cart");
                          } else {
                            updateCart(item);
                            getcart();
                          }
                        }}
                        className="wishlist-cart-btn"
                      >
                        {cartButton}
                      </button>
                      <button onClick={() => removeFromWishList(_id)}>
                        Remove from WishList
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
