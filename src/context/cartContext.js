import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = localStorage.getItem("encodedToken");

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

  // add to cart
  const updateCart = async (data) => {
    const product = { product: data };
    // console.log(product);
    try {
      const response = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify(product),
      });
      toast.success("Product Added to Cart");
      // console.log(await response.json());
    } catch (e) {
      toast.error(...e.response.data.errors);
      // console.log(e);
    }
  };

  // increase or decrease cart quantity
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

      dispatch({ type: "update", updatedCart: await response.json() });
      type === "increase"
        ? toast.success("Quantity increased by 1")
        : toast.success("Quantity decreased by 1");
    } catch (e) {
      toast.error(...e.response.data.errors);
      // console.log(e);
    }
  };

  // remove from cart
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
      toast.success("Removed from Cart");
    } catch (e) {
      toast.error(...e.response.data.errors);
      // console.error(e);
    }
  };

  // method if api is not given and simple on click of button we neet to get and manage data
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
    return state;
  };
  useEffect(() => {
    getcart();
  }, []);
  const [cartdetails, dispatch] = useReducer(cartHandler, []);
  // console.log(cartdetails);

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
