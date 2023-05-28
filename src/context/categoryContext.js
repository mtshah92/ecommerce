import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const getCategory = async () => {
    try {
      const data = await fetch("/api/categories");
      const response = await data.json();
      setCategories(response.categories);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => getCategory(), []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};
