import { useContext } from "react";
import { WishListContext } from "../context/wishListContext";

export const WishList = () => {
  const { wishListState, wishListdispatch } = useContext(WishListContext);
  return (
    <div>
      <h2>WishList</h2>
      {wishListState.map((item) => {
        const { _id, title, author, categoryName, url, price } = item;
        return (
          <div key={_id}>
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>Category: {categoryName}</p>
            <button>Add to Cart</button>
            <button
              onClick={() =>
                wishListdispatch({ id: _id, type: "removeFromWishList" })
              }
            >
              Remove from WishList
            </button>
          </div>
        );
      })}
    </div>
  );
};
