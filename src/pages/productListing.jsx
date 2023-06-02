import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import { CartContext } from "../context/cartContext";
import { WishListContext } from "../context/wishListContext";
import "./productListing.css";

export const ProductList = () => {
  const { products } = useContext(ProductContext);
  const { dispatch } = useContext(CartContext);
  const { wishListdispatch } = useContext(WishListContext);

  return (
    <div>
      <fieldset>
        <legend>Filter</legend>
        <input
          type="radio"
          id="highToLow"
          name="priceSort"
          // onChange={(e) => productDispatch({ type: "priceSortLowToHigh" })}
        />
        <label for="highToLow">Price: Low to High</label>
        <input
          type="radio"
          id="lowToHigh"
          name="priceSort"
          // onChange={() => productDispatch({ type: "priceSortHighToLow" })}
        />
        <label for="LowToHigh">Price: High To Low</label>
        <input type="checkbox" id="non-fiction" />
        <label for="non-fiction">Non-Fiction</label>
        <input type="checkbox" id="fiction" />
        <label for="fiction">Fiction</label>
        <input type="checkbox" id="horror" />
        <label for="horror">Horror</label>
      </fieldset>
      {products.map((item) => {
        const { _id, title, author, price, categoryName, url } = item;
        return (
          <div key={_id} className="product-card">
            <img src={url} width="150px" height="200px" alt={title} />
            <p>
              {title} By {author}
            </p>

            <p> {price}</p>

            <div className="buttons">
              <button
                onClick={() => {
                  dispatch({ id: _id, value: item });
                }}
                className="add-button"
              >
                Add to Cart
              </button>
              <button
                onClick={() => wishListdispatch({ id: _id, value: item })}
                className="wishList-button"
              >
                Add to WishList
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
