import { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { WishListContext } from "../../context/wishListContext";

export const Cart = () => {
  const { cartdetails, dispatch, removeFromCart, increaseAndDecreaseQty } =
    useContext(CartContext);
  const { updateWishlist, wishlistdata } = useContext(WishListContext);

  return (
    <div>
      <h2>Cart</h2>
      {cartdetails.cart?.map((item) => {
        const { _id, title, price, categoryName, author, url, qty, id } = item;
        return (
          <div key={_id}>
            <h2>{title}</h2>
            <p>Author:{author}</p>
            <p>Category:{categoryName}</p>
            <p>Quantity:{qty}</p>
            <button onClick={() => increaseAndDecreaseQty(_id, "increase")}>
              +
            </button>
            <button
              onClick={() => {
                increaseAndDecreaseQty(_id, "decrease");
                if (qty === 1) {
                  removeFromCart(_id);
                }
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                if (
                  wishlistdata?.wishlist?.find((value) => value._id === _id)
                ) {
                } else {
                  updateWishlist(item);
                }
              }}
            >
              Add to WishList
            </button>
            <button onClick={() => removeFromCart(_id)}>
              Remove from Cart
            </button>
          </div>
        );
      })}
      <div className="price-card">
        <p>
          <b>Price:</b>{" "}
          {cartdetails.cart?.reduce(
            (acc, curr) => Number(curr.price) * Number(curr.qty) + acc,
            0
          )}
        </p>
        <button>Proceed to CheckOut</button>
      </div>
    </div>
  );
};
