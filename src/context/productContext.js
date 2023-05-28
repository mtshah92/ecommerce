import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const data = await fetch("/api/products");
      const productList = await data.json();
      setProducts(productList.products);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => fetchProducts(), []);
  return (
    <ProductContext.Provider value={{ products }}>
      {" "}
      {children}
    </ProductContext.Provider>
  );
};
