import { createContext, useEffect, useReducer, useState } from "react";
import { products } from "../backend/db/products";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState();
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [value, setValue] = useState();

  const fetchProducts = async () => {
    try {
      const data = await fetch("/api/products");
      const productList = await data.json();

      productdispatch({ payload: productList, type: "initialData" });
    } catch (e) {
      console.error(e);
    }
  };

  const filterHandle = (state, action) => {
    if (action.type === "initialData") {
      return action.payload.products;
    }
    if (action.type === "cartAdd") {
      state.map((item) => {
        if (item._id === action.id) {
          return { ...item, cart: true };
        } else {
          return item;
        }
      });
    }
  };

  const [productState, productdispatch] = useReducer(filterHandle, []);

  useEffect(() => fetchProducts(), []);

  const sortHandler = (e) => {
    setFilter([e.target.value]);
  };

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setFilter([...filter, e.target.value]);
    } else {
      setFilter(filter.filter((item) => e.target.value !== item));
    }
  };
  const cartHandler = (item) => {
    setCart([...cart, item]);
  };
  const wishListHandler = (item) => {
    setWishList([...wishList, item]);
  };
  console.log(cart);
  const data = () => {
    let product = [...productState];
    console.log(value);

    if (value) {
      product = product.filter((item) => Number(item.price) <= value);
    }
    if (search) {
      product = product.filter((item) => item.title.includes(search));
    }
    product = product.map((item) => {
      if (wishList.find((value) => value === item)) {
        return { ...item, wishList: true };
      } else {
        return item;
      }
    });
    product = product.map((item) => {
      if (cart.find((value) => value === item)) {
        return { ...item, cart: true };
      } else {
        return item;
      }
    });

    filter.map((item) => {
      if (item === "sortLowToHigh") {
        product = [...product].sort((a, b) => a.price - b.price);
      }
      if (item === "sortHighToLow") {
        product = [...product].sort((a, b) => b.price - a.price);
      }
      if (item === "horror") {
        product = product.filter((item) => item.categoryName === "horror");
      }
      if (item === "fiction") {
        product = product.filter((item) => item.categoryName === "fiction");
      }
      if (item === "non-fiction") {
        product = product.filter((item) => item.categoryName === "non-fiction");
      }
      if (item === "morethan2") {
        product = product.filter((item) => item.rating > 2);
      }
      if (item === "morethan3") {
        product = product.filter((item) => item.rating > 3);
      }
      if (item === "morethan4") {
        product = product.filter((item) => item.rating > 4);
      }
    });

    return product;
  };
  // console.log(filter);
  return (
    <ProductContext.Provider
      value={{
        productState,
        productdispatch,
        data,
        sortHandler,
        checkboxHandler,
        search,
        setSearch,
        cartHandler,
        wishListHandler,
        setValue,
        value,
      }}
    >
      {" "}
      {children}
    </ProductContext.Provider>
  );
};
