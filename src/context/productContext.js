import { createContext, useEffect, useReducer, useState } from "react";
import { products } from "../backend/db/products";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // const [cart, setCart] = useState([]);
  // const [wishList, setWishList] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const initialData = {
    products: [],
    search: "",
    value: "1000",
    sort: "",
    checkbox: [],
    sortByPrice: "",
    addresses: [
      {
        id: 1,
        name: "Meet Shah",
        mobile: "9898125225",
        address: "Rysan",
        pincode: 382010,
        city: "Gandhinagar",
        state: "Gujarat",
      },
    ],
    selectedAddress: [],
    editAddress: {},
    newAddress: {
      name: "",
      mobile: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
    },
  };

  const filterHandle = (state, action) => {
    switch (action.type) {
      case "initialData":
        return { ...state, products: action.payload };

      case "cartAdd":
        return state.products.map((item) => {
          if (item._id === action.id) {
            return { ...item, cart: true };
          } else {
            return item;
          }
        });

      case "checkbox":
        return {
          ...state,
          checkbox: action.payload.target.checked
            ? // ||
              // action.payload.target.any === "value"
              [...state.checkbox, action.payload.target.value]
            : state.checkbox.filter(
                (item) => action.payload.target.value !== item
              ),
        };

      case "value":
        return { ...state, value: action.payload };

      case "sort":
        return { ...state, sort: action.payload };
      case "search":
        return { ...state, search: action.payload };

      case "sortPrice":
        return { ...state, sortByPrice: action.payload };

      case "clearFilter":
        return {
          ...state,
          checkbox: [],
          value: "1000",
          search: "",
          sort: "",
          sortByPrice: "",
        };

      case "selected_address":
        return {
          ...state,
          selectedAddress: [action.payload],
        };

      case "delete_address":
        return {
          ...state,
          addresses: state.addresses.filter((item) => item !== action.payload),
        };
      case "edit_address":
        return {
          ...state,
          editAddress: action.payload,
        };
      case "edit_update_Address":
        return {
          ...state,
          addresses: state.addresses.map((item) =>
            item.name === action.payload.name ? { ...action.payload } : item
          ),
        };
      case "update_Address":
        return {
          ...state,
          addresses: [...state.addresses, action.payload],
        };
      default:
        return state;
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      productdispatch({ payload: response.data.products, type: "initialData" });
    } catch (e) {
      console.error(e);
    }
  };

  const [productState, productdispatch] = useReducer(filterHandle, initialData);
  // console.log(productState.checkbox);

  useEffect(() => fetchProducts(), []);

  // const cartHandler = (item) => {
  //   setCart([...cart, item]);
  // };
  // const wishListHandler = (item) => {
  //   setWishList([...wishList, item]);
  // };

  const data = () => {
    let product = [...productState.products];

    if (productState.search) {
      product = product.filter((item) =>
        item.title.toLowerCase().includes(productState.search.toLowerCase())
      );
    }

    if (productState.value) {
      product = product.filter(
        (item) => Number(item.price) <= Number(productState.value)
      );
    }
    if (productState.sortByPrice) {
      if (productState.sortByPrice === "sortLowToHigh") {
        product = [...product].sort((a, b) => a.price - b.price);
      }
      if (productState.sortByPrice === "sortHighToLow") {
        product = [...product].sort((a, b) => b.price - a.price);
      }
    }

    if (productState.sort) {
      if (productState.sort === "morethan2") {
        product = product.filter((item) => item.rating > 2);
      }
      if (productState.sort === "morethan3") {
        product = product.filter((item) => item.rating > 3);
      }
      if (productState.sort === "morethan4") {
        product = product.filter((item) => item.rating > 4);
      }
    }

    if (productState.checkbox.length > 0) {
      product = product.filter((item) =>
        productState.checkbox.includes(item.categoryName)
      );
    }

    // product = product.map((item) => {
    //   if (wishList.find((value) => value === item)) {
    //     return { ...item, wishList: true };
    //   } else {
    //     return item;
    //   }
    // });
    // product = product.map((item) => {
    //   if (cart.find((value) => value === item)) {
    //     return { ...item, cart: true };
    //   } else {
    //     return item;
    //   }
    // });

    return product;
  };

  return (
    <ProductContext.Provider
      value={{
        productState,
        productdispatch,
        data,
        showAddressModal,
        setShowAddressModal,
        // cartHandler,
        // wishListHandler,
      }}
    >
      {" "}
      {children}
    </ProductContext.Provider>
  );
};
