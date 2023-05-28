import { useContext } from "react";
import { CategoryContext } from "../context/categoryContext";

export const Home = () => {
  const { categories } = useContext(CategoryContext);

  return (
    <div>
      <h2>Home</h2>
      {categories.map((item) => (
        <div>
          <li>
            <h3>{item.categoryName}</h3>
            <p>{item.description}</p>
          </li>
        </div>
      ))}
    </div>
  );
};
