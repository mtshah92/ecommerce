import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { WishListContext } from "../context/wishListContext";

export const Cart = () => {
  const { cartState, dispatch } = useContext(CartContext);
  const { wishListdispatch } = useContext(WishListContext);
  return (
    <div>
      <h2>Cart</h2>
      {cartState.map((item) => {
        const { _id, title, price, categoryName, author, url, quantity } = item;
        return (
          <div key={_id}>
            <h2>{title}</h2>
            <p>Author:{author}</p>
            <p>Category:{categoryName}</p>
            <p>Quantity:{quantity}</p>
            <button onClick={() => dispatch({ id: _id, type: "increase" })}>
              +
            </button>
            <button
              onClick={() =>
                dispatch({ id: _id, type: "decrease", value: item })
              }
            >
              -
            </button>
            <button onClick={() => wishListdispatch({ id: _id, value: item })}>
              Add to WishList
            </button>
          </div>
        );
      })}
      <div className="price-card">
        <p>
          <b>Price:</b>{" "}
          {cartState.reduce(
            (acc, curr) => Number(curr.price) * curr.quantity + acc,
            0
          )}
        </p>
        <button>Proceed to CheckOut</button>
      </div>
    </div>
  );
};
