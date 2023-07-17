import { useContext, useState } from "react";

import { ProductContext } from "../../context/productContext";
import { CartContext } from "../../context/cartContext";
import { WishListContext } from "../../context/wishListContext";
import "./productListing.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NavBar } from "../../components/navigation/navigation";

export const ProductList = () => {
  const { data, sortHandler, checkboxHandler, setValue, value } =
    useContext(ProductContext);
  const { getcart, updateCart, cartdetails } = useContext(CartContext);
  const { updateWishlist, wishlistdata } = useContext(WishListContext);
  const { userlogin, authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const info = data();
  // console.log(info);
  const token = localStorage.getItem("encodedToken");
  return (
    <div>
      <NavBar />
      <div className="productListing">
        <div className="filter">
          <div className="filterName">
            <h3 className="filterTitle">Filter</h3>
            <button className="clearFilter">Clear All</button>
          </div>
          {/* <div className="priceSort">
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
        </div> */}

          <div>
            <h3>Price Range</h3>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              onChange={(e) => setValue(e.target.value)}
              list="markers"
              defaultValue={"500"}
            />

            <datalist id="markers">
              <option value="100" label="100"></option>
              <option value="500" label="500"></option>
              <option value="1000" label="1000"></option>
            </datalist>
            <p>Price Selected: {`<=${value}`}</p>
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
                <img src={url} width="150px" height="200px" alt={title} />
                <p>
                  {title} By {author}
                </p>
                <p> ★{rating} </p>
                <p>₹{price}</p>

                <div className="buttons">
                  {cartdetails.cart?.find((value) => value._id === _id) ? (
                    token === "false" ? (
                      <button onClick={() => navigate("/login")}>
                        Add to Cart
                      </button>
                    ) : (
                      <NavLink to="/cart">Go to Cart</NavLink>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        if (authState.currentUser) {
                          updateCart(item);
                          getcart();
                        } else {
                          navigate("/login");
                        }
                      }}
                      className="add-button"
                    >
                      Add to Cart
                    </button>
                  )}

                  {wishlistdata?.wishlist?.find(
                    (value) => value._id === _id
                  ) ? (
                    token === "false" ? (
                      <button onClick={() => navigate("/login")}>
                        Add to WishList
                      </button>
                    ) : (
                      <NavLink to="/wishList">Go to WishList</NavLink>
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
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
