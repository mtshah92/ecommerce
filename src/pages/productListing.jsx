import { useContext, useState } from "react";

import { ProductContext } from "../context/productContext";
import { CartContext } from "../context/cartContext";
import { WishListContext } from "../context/wishListContext";
import "./productListing.css";

export const ProductList = () => {
  const { data, sortHandler, checkboxHandler } = useContext(ProductContext);
  const { dispatch } = useContext(CartContext);
  const { wishListdispatch } = useContext(WishListContext);

  const info = data();
  // console.log(info);

  return (
    <div className="productListing">
      <div className="filter">
        <div className="filterName">
          <h3 className="filterTitle">Filter</h3>
          <button className="clearFilter">Clear All</button>
        </div>
        <div className="priceSort">
          <h3 className="priceName">Sort By Price</h3>
          <div className="priceSortLowToHigh">
            <input
              type="radio"
              id="lowToHigh"
              name="priceSort"
              value="sortLowToHigh"
              onChange={sortHandler}
            />
            <label for="lowToHigh">Price: Low to High</label>
          </div>
          <div className="priceSortHighToLow">
            <input
              type="radio"
              id="highToLow"
              name="priceSort"
              value="sortHighToLow"
              onChange={sortHandler}
            />
            <label for="highToLow">Price: High To Low</label>
          </div>
        </div>
        <div className="checkbox">
          <h3>Categories</h3>
          <div className="non-fiction-checkbox">
            <input
              type="checkbox"
              id="non-fiction"
              value="non-fiction"
              onChange={checkboxHandler}
            />
            <label for="non-fiction">Non-Fiction</label>
          </div>
          <div className="fiction-checkbox">
            <input
              type="checkbox"
              id="fiction"
              value="fiction"
              onChange={checkboxHandler}
            />
            <label for="fiction">Fiction</label>
          </div>
          <div className="horror-checkbox">
            <input
              type="checkbox"
              id="horror"
              value="horror"
              onChange={checkboxHandler}
            />
            <label for="horror">Horror</label>
          </div>
        </div>
        <div className="rating">
          <h3>Sort By Rating</h3>
          <div>
            <input
              type="radio"
              id="morethan2"
              value="morethan2"
              name="rating"
              onChange={sortHandler}
            />
            <label for="morethan2"> 2 stars & above</label>
          </div>
          <div>
            <input
              type="radio"
              id="morethan3"
              value="morethan3"
              name="rating"
              onChange={sortHandler}
            />
            <label for="morethan3"> 3 stars & above</label>
          </div>
          <div>
            <input
              type="radio"
              id="morethan4"
              value="morethan4"
              name="rating"
              onChange={sortHandler}
            />
            <label for="morethan4"> 4 stars & above</label>
          </div>
        </div>
      </div>
      <div className="products">
        {info.map((item) => {
          const { _id, title, author, price, categoryName, rating, url } = item;
          return (
            <div key={_id} className="product-card">
              <img src={url} width="150px" height="200px" alt={title} />
              <p>
                {title} By {author}
              </p>
              <p> ★{rating} </p>
              <p>₹{price}</p>

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
    </div>
  );
};
