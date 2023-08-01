import { useContext } from "react";
import { CategoryContext } from "../../context/categoryContext";
import { NavBar } from "../../components/navigation/navigation";
import { Link, useNavigate } from "react-router-dom";
import CoverImage from "../../images/slider03.webp";
import fiction from "../../images/124204431_394384531715152_7504566896586926085_n.webp";
import nonFiction from "../../images/124265174_172949657841467_7988514218156989126_n.webp";
import horror from "../../images/124782748_1094687034287623_5569666499296138744_n.webp";
import { ProductContext } from "../../context/productContext";
import { Footer } from "../../components/footer/footer";
import "./home.css";

export const Home = () => {
  const { categories } = useContext(CategoryContext);
  const { productdispatch } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div>
      <NavBar page={"home"} />
      <div className="cover-image-container">
        <img src={CoverImage} className="cover-image" />
        <div className="shop-btn">
          <p className="welcome-txt">Welcome to CustoFriend,</p>
          <div className="shop-welcome-txt">
            <p>For All Your</p>
            <p>Reading Needs</p>
          </div>
          <Link to="/products" className="shop-txt">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="featured-category">
        {" "}
        <h2>Featured Book Categories</h2>
        <p>
          There are many categories of books available at CustoFriend. Choose
          your favorite one now.
        </p>
      </div>
      <div className="category-container">
        {categories.map((item) => (
          <div
            className="category-card"
            onClick={() => {
              navigate("/products");
              productdispatch({
                type: "checkbox",
                payload: {
                  target: {
                    checked: true,
                    value: item.categoryName,
                  },
                },
              });
            }}
          >
            <div className="about-category">
              <h3 className="category-name">{item.categoryName}</h3>
              <p className="category-description">{item.description}</p>
            </div>
            <div className="category-image">
              {item.categoryName === "fiction" && (
                <img src={fiction} className="category-cover-image" />
              )}
              {item.categoryName === "non-fiction" && (
                <img src={nonFiction} className="category-cover-image" />
              )}
              {item.categoryName === "horror" && (
                <img src={horror} className="category-cover-image" />
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};
