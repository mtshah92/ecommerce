import { createContext, useReducer, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  // get cart
  const getcart = async () => {
    try {
      const data = await fetch("/api/user/cart", {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "get", item: await data.json() });
    } catch (e) {
      console.log(e);
    }
  };

  // add cart
  const updateCart = async (data) => {
    const product = { product: data };
    console.log(product);
    try {
      const response = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify(product),
      });

      console.log(await response.json());
    } catch (e) {
      console.log(e);
    }
  };

  const increaseAndDecreaseQty = async (id, type) => {
    const updateaction = {
      action: { type: type === "increase" ? "increment" : "decrement" },
    };
    try {
      const response = await fetch(`/api/user/cart/${id}`, {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify(updateaction),
      });
      // console.log(await response.json());
      dispatch({ type: "update", updatedCart: await response.json() });
    } catch (e) {
      console.log(e);
    }
  };

  const removeFromCart = async (data) => {
    const id = data;

    try {
      const response = await fetch(`/api/user/cart/${id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "delete", data: await response.json() });
      // console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  };

  // const handleCart = (state, action) => {
  //   //   if (action.type === "increase") {
  //   //     return state.map((item) => {
  //   //       if (item._id === action.id) {
  //   //         return { ...item, quantity: item.quantity + 1 };
  //   //       } else {
  //   //         return item;
  //   //       }
  //   //     });
  //   //   } else if (action.type === "decrease") {
  //   //     if (action.value.quantity === 1) {
  //   //       return state.filter((item) => item._id !== action.id);
  //   //     } else {
  //   //       return state.map((item) => {
  //   //         if (item._id === action.id) {
  //   //           return { ...item, quantity: item.quantity - 1 };
  //   //         } else {
  //   //           return item;
  //   //         }
  //   //       });
  //   //     }
  //   //   } else {
  //   if (state.find((item) => item._id === action.id)) {
  //     return state.map((value) => {
  //       if (value._id === action.id) {
  //         return { ...value, quantity: 1 };
  //       } else {
  //         return value;
  //       }
  //     });
  //   } else {
  //     const data = { ...action.value, quantity: 1 };
  //     return [...state, data];
  //   }
  //   //   }
  // };

  // const [cartState, dispatch] = useReducer(handleCart, []);
  // console.log(cartState);

  const cartHandler = (state, action) => {
    if (action.type === "get") {
      return action.item;
    }
    if (action.type === "delete") {
      return action.data;
    }
    if (action.type === "update") {
      return action.updatedCart;
    }
  };
  const [cartdetails, dispatch] = useReducer(cartHandler, []);
  console.log(cartdetails);
  return (
    <CartContext.Provider
      value={{
        getcart,
        updateCart,
        cartdetails,
        removeFromCart,
        increaseAndDecreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
