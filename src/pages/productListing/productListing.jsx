import { useContext } from "react";

import { ProductContext } from "../../context/productContext";
import { CartContext } from "../../context/cartContext";
import { WishListContext } from "../../context/wishListContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NavBar } from "../../components/navigation/navigation";
import "./productListing.css";
import { FilterPane } from "../../components/filterPane/filterPane";

export const ProductList = () => {
  const { data } = useContext(ProductContext);
  const { getcart, updateCart, cartdetails } = useContext(CartContext);
  const { updateWishlist, wishlistdata, removeFromWishList } =
    useContext(WishListContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const info = data();

  return (
    <div>
      <NavBar />
      <div className="productListing">
        <FilterPane />

        <div className="products">
          {info.length == 0 ? (
            <h2 className="empty-books">
              Sorry , Products are not available for such search.
            </h2>
          ) : (
            info.map((item) => {
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
                    alt={title}
                    onClick={() => navigate(`/products/${_id}`)}
                    className="product-img"
                  />

                  <span
                    className="add-to-wishlist-btn"
                    onClick={() => {
                      if (token) {
                        if (
                          wishlistdata?.wishlist?.find(
                            (value) => value._id === _id
                          )
                        ) {
                          removeFromWishList(_id);
                        } else {
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
                      <i className="bi bi-heart bi-suit-heart-fill red-color filled-wishlist"></i>
                    ) : (
                      <i class="bi bi-heart fill-wishlist"></i>
                    )}
                  </span>

                  <div className="product-card-info">
                    <div className="product-title-container">
                      <div className="product-title">
                        <h3 className="product-title-header">{title}</h3>
                        <div className="product-rating">
                          {rating} <i class="bi bi-star-fill"></i>
                        </div>
                      </div>
                      <p className="product-author">{author}</p>
                    </div>
                    <div className="product-price">
                      <p className="price">₹{price}</p>
                    </div>
                  </div>

                  <div className="buttons">
                    <div>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => {
                          if (token) {
                            if (
                              cartdetails.cart?.find(
                                (value) => value._id === _id
                              )
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
                          <Link to="/cart" className="go-to-cart">
                            Go To Cart
                          </Link>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
