import { useContext, useState } from "react";
import { NavBar } from "../../components/navigation/navigation";
import { CartContext } from "../../context/cartContext";
import "./checkout.css";
import { ProductContext } from "../../context/productContext";
import { useNavigate } from "react-router";
import { AddressModal } from "../../components/addressModal/addressModal";

export const CheckOut = () => {
  const { cartdetails } = useContext(CartContext);
  const {
    productState,
    productdispatch,
    showAddressModal,
    setShowAddressModal,
  } = useContext(ProductContext);
  const [markedAddress, setMarkAddress] = useState();
  const [editAdd, setEditAdd] = useState(false);

  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      {showAddressModal ? (
        <AddressModal editAdd={editAdd} setEditAdd={setEditAdd} />
      ) : (
        <div className="checkout-page">
          <h1>Checkout</h1>
          <div className="checkout-content">
            <div className="checkout-address">
              {/* <h3>Address</h3> */}
              <div className="checkout-address-details">
                {productState?.addresses?.map((item) => (
                  <div className="address">
                    <div>
                      <input
                        type="radio"
                        name="address"
                        onClick={(e) => {
                          productdispatch({
                            type: "selected_address",
                            payload: item,
                          });
                          setMarkAddress(e.target);
                        }}
                      />
                    </div>
                    <div className="add">
                      <h3>{item.name}</h3>
                      <p>
                        {item.address},{item.city},{item.state},{item.pincode}
                      </p>
                      <p>{item.mobile}</p>
                    </div>
                    <div className="address-btn">
                      <button
                        className="edit-add"
                        onClick={() => {
                          setShowAddressModal(true);
                          setEditAdd(true);
                          productdispatch({
                            type: "edit_address",
                            payload: item,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="del-add"
                        onClick={() =>
                          productdispatch({
                            type: "delete_address",
                            payload: item,
                          })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <div className="add-new-address">
                  <button onClick={() => setShowAddressModal(true)}>
                    + Add New Address
                  </button>
                </div>
              </div>
            </div>

            <div className="order-details">
              <hr />
              <p className="order-details-title">Invoice</p>
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
                {/* <hr /> */}
                <div className="cart-price-item">
                  <p className="cart-total">Total</p>
                  <div className="cart-total-price">
                    <p>
                      &#8377;
                      {cartdetails.cart?.reduce(
                        (acc, curr) =>
                          Number(curr.price) * Number(curr.qty) + acc,
                        0
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <p className="deliver-to">Deliver To</p>
              <hr />
              {markedAddress?.checked &&
                productState.selectedAddress?.map((item) => (
                  <div className="delivery-address">
                    <h4>{item.name}</h4>
                    <p>
                      {item.address},{item.city},{item.state},{item.pincode}
                    </p>
                    <p>{item.mobile}</p>
                  </div>
                ))}
              <button
                className="checkout-btn"
                onClick={() => navigate("/orderSummary")}
                disabled={!markedAddress?.checked}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
