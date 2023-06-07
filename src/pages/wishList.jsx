import { useContext, useState } from "react";
import { WishListContext } from "../context/wishListContext";
import { CartContext } from "../context/cartContext";
import { NavLink } from "react-router-dom";

export const WishList = () => {
  const { wishlistdata, removeFromWishList } = useContext(WishListContext);
  const { updateCart, getcart, cartdetails } = useContext(CartContext);
  const [cartButton, setCartButton] = useState("Add to cart");

  return (
    <div>
      <h2>WishList</h2>
      {wishlistdata?.wishlist?.map((item) => {
        const { _id, title, author, categoryName, url, price } = item;
        return (
          <div key={_id}>
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>Category: {categoryName}</p>
            <button
              onClick={() => {
                if (cartdetails?.cart?.find((value) => value._id === _id)) {
                  setCartButton("Added to Cart");
                } else {
                  updateCart(item);
                  getcart();
                }
              }}
            >
              {cartButton}
            </button>
            <button onClick={() => removeFromWishList(_id)}>
              Remove from WishList
            </button>
          </div>
        );
      })}
    </div>
  );
};
