import { createContext, useReducer } from "react";
import { toast } from "react-toastify";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const token = localStorage.getItem("encodedToken");

  // updateWishList
  const updateWishlist = async (data) => {
    const product = { product: data };
    console.log(product, token);
    try {
      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify(product),
      });
      dispatch({ type: "update", data: await response.json() });
      toast.success("Product Added to Wishlist");
      // console.log(await response.json());
    } catch (e) {
      toast.error(...e.response.data.errors);
      // console.error(e);
    }
  };

  // getWishList
  const getWishlist = async () => {
    try {
      const response = await fetch("/api/user/wishlist", {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  };

  //remive from wishlist
  const removeFromWishList = async (id) => {
    try {
      const response = await fetch(`/api/user/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "remove", item: await response.json() });
      toast.success("Product Removed from Wishlist");
      // console.log(await response.json());
    } catch (e) {
      toast.error(...e.response.data.errors);
      // console.log(e);
    }
  };

  const wishListHandle = (state, action) => {
    if (action.type === "update") {
      return action.data;
    }
    if (action.type === "remove") {
      return action.item;
    }
  };

  const [wishlistdata, dispatch] = useReducer(wishListHandle, []);
  // console.log(wishlistdata);

  //method if api is not given and simple on click of button we neet to get and manage data
  // const wishListHandler = (state, action) => {
  //   const data = [...state, action.value];
  //   console.log(data);
  //   if (action.type === "removeFromWishList") {
  //     return state.filter((item) => item._id !== action.id);
  //   } else {
  //     return data.filter(
  //       (value, index, array) => array.indexOf(value) === index
  //     );
  //   }
  // };

  // const [wishListState, wishListdispatch] = useReducer(wishListHandler, []);
  // console.log(wishListState);
  return (
    <WishListContext.Provider
      value={{
        updateWishlist,
        getWishlist,
        removeFromWishList,
        wishlistdata,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
