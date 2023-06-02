import { createContext, useContext, useReducer, useState } from "react";
import { ProductContext } from "./productContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // const { products } = useContext(ProductContext);

  const handleCart = (state, action) => {
    if (action.type === "increase") {
      return state.map((item) => {
        if (item._id === action.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    } else if (action.type === "decrease") {
      if (action.value.quantity === 1) {
        return state.filter((item) => item._id !== action.id);
      } else {
        return state.map((item) => {
          if (item._id === action.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    } else {
      if (state.find((item) => item._id === action.id)) {
        return state.map((value) => {
          if (value._id === action.id) {
            return { ...value, quantity: value.quantity + 1 };
          } else {
            return value;
          }
        });
      } else {
        const data = { ...action.value, quantity: 1, cart: true };
        return [...state, data];
      }
    }
  };

  const [cartState, dispatch] = useReducer(handleCart, []);
  // console.log(cartState);
  return (
    <CartContext.Provider value={{ dispatch, cartState }}>
      {children}
    </CartContext.Provider>
  );
};
