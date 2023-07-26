import { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { WishListContext } from "../../context/wishListContext";
import { NavBar } from "../../components/navigation/navigation";
import "./cart.css";
import { useNavigate } from "react-router";

export const Cart = () => {
  const { cartdetails, dispatch, removeFromCart, increaseAndDecreaseQty } =
    useContext(CartContext);
  const { updateWishlist, wishlistdata } = useContext(WishListContext);
  const navigate = useNavigate();
  return (
    <div>
      <NavBar page="cart" />
      <h2>Cart</h2>
      {cartdetails.cart?.length === 0 ? (
        <div className="empty-cart">
          <h2>Cart Is Empty</h2>
          <button onClick={() => navigate("/products")}>
            Explore Products
          </button>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-product">
            {cartdetails.cart?.map((item) => {
              const { _id, title, price, categoryName, author, url, qty, id } =
                item;
              return (
                <div key={_id} className="cart-each-product">
                  <div>
                    <img src={url} alt={title} className="cart-product-img" />
                  </div>
                  <div className="cart-part-product">
                    <h3>{title}</h3>
                    <p>Author:{author}</p>
                    <p>Category:{categoryName}</p>
                    {/* <p>Quantity:{qty}</p> */}
                    <div className="cart-page-btn">
                      <div className="cart-update-btn">
                        <button
                          onClick={() =>
                            increaseAndDecreaseQty(_id, "increase")
                          }
                        >
                          +
                        </button>
                        <span className="cart-qty">{qty}</span>
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
                      </div>
                      <button
                        onClick={() => {
                          if (
                            wishlistdata?.wishlist?.find(
                              (value) => value._id === _id
                            )
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
                  </div>
                </div>
              );
            })}
          </div>
          <div className="price-card">
            <hr />
            <h3>Price Details</h3>
            <hr />
            <div className="cart-price-details">
              <div className="cart-price-item">
                <p>Price ({`${cartdetails.cart?.length} items`})</p>
                <div className="cart-price-part">
                  <p>
                    &#8377;{" "}
                    {cartdetails.cart?.reduce(
                      (acc, curr) =>
                        Number(curr.price) * Number(curr.qty) + acc,
                      0
                    )}
                  </p>
                </div>
              </div>
              <div className="cart-price-item">
                <p>Delivery Charges</p>
                <div className="cart-price-part">
                  <p>Free</p>
                </div>
              </div>
              <hr />
              <div className="cart-price-item">
                <h3>Total</h3>
                <div className="cart-price-part">
                  <h3>
                    &#8377;
                    {cartdetails.cart?.reduce(
                      (acc, curr) =>
                        Number(curr.price) * Number(curr.qty) + acc,
                      0
                    )}
                  </h3>
                </div>
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
