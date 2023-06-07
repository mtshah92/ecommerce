import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoryProvider } from "./context/categoryContext";
import { ProductProvider } from "./context/productContext";
import { CartProvider } from "./context/cartContext";
import { WishListProvider } from "./context/wishListContext";
import { AuthProvider } from "./context/AuthContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <CategoryProvider>
          <CartProvider>
            <WishListProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </WishListProvider>
          </CartProvider>
        </CategoryProvider>
      </ProductProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
