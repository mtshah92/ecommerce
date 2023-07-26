import { useContext, useState } from "react";
import { ProductContext } from "../../context/productContext";

export const AddressModal = ({ editAdd, setEditAdd }) => {
  const { productState, productdispatch, setShowAddressModal } =
    useContext(ProductContext);

  const [updatedAddress, setupdatedAdress] = useState(
    editAdd
      ? { ...productState.editAddress }
      : {
          name: "",
          mobile: "",
          address: "",
          pincode: "",
          city: "",
          state: "",
        }
  );

  const dummyData = {
    name: "Aman Jain",
    mobile: "9634278902",
    address: "Sagar",
    pincode: "391002",
    city: "Indore",
    state: "Madhya Pradesh",
  };

  return (
    <div className="address-modal">
      <h3>Enter Your Billing Address</h3>
      <div>
        <input
          type="text"
          placeholder="Name"
          id="address-name"
          className="address-details"
          value={updatedAddress.name}
          onChange={(e) =>
            setupdatedAdress({ ...updatedAddress, name: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Mobile no."
          id="address-mobile"
          className="address-details"
          value={updatedAddress.mobile}
          onChange={(e) =>
            setupdatedAdress({ ...updatedAddress, mobile: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Address"
          id="address-address"
          className="address-details"
          value={updatedAddress.address}
          onChange={(e) =>
            setupdatedAdress({ ...updatedAddress, address: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Pincode"
          id="address-pincode"
          className="address-details"
          value={updatedAddress.pincode}
          onChange={(e) =>
            setupdatedAdress({ ...updatedAddress, pincode: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="City"
          id="address-city"
          className="address-details"
          value={updatedAddress.city}
          onChange={
            (e) => setupdatedAdress({ ...updatedAddress, city: e.target.value })
            // productdispatch({ type: "update_address", payload: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="State"
          id="address-state"
          className="address-details"
          value={updatedAddress.state}
          onChange={(e) =>
            setupdatedAdress({ ...updatedAddress, state: e.target.value })
          }
        />
      </div>
      <div className="address-modal-btn">
        <button
          className="address-update-btn"
          onClick={() => {
            setShowAddressModal(false);
            setEditAdd(false);
            editAdd
              ? productdispatch({
                  type: "edit_update_Address",
                  payload: updatedAddress,
                })
              : productdispatch({
                  type: "update_Address",
                  payload: updatedAddress,
                });
          }}
        >
          {editAdd ? "Save" : "Add"}
        </button>
        <button
          className="address-update-btn"
          onClick={() => {
            setShowAddressModal(false);
            setEditAdd(false);
            productdispatch({ type: "update_Address", payload: dummyData });
          }}
        >
          Dummy Data
        </button>
        <button
          className="address-update-btn"
          onClick={() => {
            setShowAddressModal(false);
            setEditAdd(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
