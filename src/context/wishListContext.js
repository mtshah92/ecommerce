import { createContext, useReducer } from "react";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const wishListHandler = (state, action) => {
    if (action.type === "removeFromWishList") {
      return state.filter((item) => item._id !== action.id);
    } else {
      const data = [...state, action.value];
      return data.filter(
        (value, index, array) => array.indexOf(value) === index
      );
    }
  };

  const [wishListState, wishListdispatch] = useReducer(wishListHandler, []);
  // console.log(state);
  return (
    <WishListContext.Provider value={{ wishListdispatch, wishListState }}>
      {children}
    </WishListContext.Provider>
  );
};
