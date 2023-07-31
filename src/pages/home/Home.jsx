import { useContext } from "react";
import { CategoryContext } from "../../context/categoryContext";
import { NavBar } from "../../components/navigation/navigation";
import { Link, useNavigate } from "react-router-dom";
import CoverImage from "../../images/slider03.webp";
import fiction from "../../images/jbareham_201014_1047_scifi_books_essentials_02.0-removebg-preview.png";
import nonFiction from "../../images/top-10-nonfiction-2019-removebg-preview.png";
import horror from "../../images/img_9971-removebg-preview.png";
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
