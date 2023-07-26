import { useContext } from "react";
import { NavBar } from "../../components/navigation/navigation";
import { CartContext } from "../../context/cartContext";
import { ProductContext } from "../../context/productContext";
import "./orderSummary.css";

export const OrderSummary = () => {
  const { cartdetails } = useContext(CartContext);
  const { productState } = useContext(ProductContext);
  return (
    <div>
      <NavBar />
      <div className="order-summary-page">
        <h3 className="order-placed">Your Order Placed.Thanks For Shopping.</h3>
        <div className="order-summary">
          <hr />
          <p className="order-details-title">Order Details</p>
          <hr />
          <div className="checkout-item">
            <p className="checkout-item-name">Item</p>
            <div className="checkout-qty-name">Qty</div>
          </div>
          <div className="checkout-item-list">
            {cartdetails.cart?.map((item) => {
              const { _id, title, qty } = item;
              return (
                <div key={_id} className="checkout-item">
                  <p>{title}</p>
                  <div className="checkout-qty">{qty}</div>
                </div>
              );
            })}
          </div>
          <hr />
          <p className="price-details">Price Details</p>
          <hr />
          <div className="cart-price-details">
            <div className="cart-price-item">
              <p>Price ({`${cartdetails.cart?.length} items`})</p>
              <div className="cart-price-part">
                <p>
                  &#8377;{" "}
                  {cartdetails.cart?.reduce(
                    (acc, curr) => Number(curr.price) * Number(curr.qty) + acc,
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
            {/* <hr /> */}
            <div className="cart-price-item">
              <p className="cart-total">Total</p>
              <div className="cart-total-price">
                <p>
                  &#8377;
                  {cartdetails.cart?.reduce(
                    (acc, curr) => Number(curr.price) * Number(curr.qty) + acc,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
          <hr />
          <p className="deliver-to">Delivered To</p>
          <hr />
          {productState.selectedAddress?.map((item) => (
            <div className="delivery-address">
              <h4>{item.name}</h4>
              <p>
                {item.address},{item.city},{item.state},{item.pincode}
              </p>
              <p>{item.mobile}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
