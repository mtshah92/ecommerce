import { useContext } from "react";
import { ProductContext } from "../context/productContext";

export const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <div>
      {products.map(({ _id, title, author, price, categoryName }) => (
        <div key={_id}>
          <h2>{title}</h2>
          <p>Author: {author}</p>
          <p>Price: {price}</p>
          <p>Category: {categoryName}</p>
        </div>
      ))}
    </div>
  );
};
