import { useNavigate, useParams } from "react-router";
import { NavBar } from "../../components/navigation/navigation";
import { useContext } from "react";
import { ProductContext } from "../../context/productContext";
import "./productPage.css";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/cartContext";
import { WishListContext } from "../../context/wishListContext";
import { Link } from "react-router-dom";

export const ProductPage = () => {
  const { productState } = useContext(ProductContext);
  const { productId } = useParams();
  const { token } = useContext(AuthContext);
  const { getcart, updateCart, cartdetails } = useContext(CartContext);
  const { updateWishlist, wishlistdata } = useContext(WishListContext);
  const navigate = useNavigate();

  const product = productState.products.find((item) => item._id === productId);
  const { _id, id, author, categoryName, price, rating, url, title } = product;
  return (
    <div>
      <NavBar />
      <div className="selected-product-page">
        <div className="selected-product-image">
          <img src={url} alt={title} className="prd-img" />
        </div>
        <div className="selected-product-description">
          <h2>{title}</h2>
          <h3>★{rating}</h3>
          <h3>₹{price}</h3>
          <p>
            <span className="author">Author:</span>
            {author}
          </p>
          <p className="product-category-name">
            <span className="category">Category:</span>
            {categoryName}
          </p>

          <div className="buttons">
            <button
              onClick={() => {
                if (token) {
                  if (cartdetails.cart?.find((value) => value._id === _id)) {
                    navigate("/cart");
                  } else {
                    updateCart(product);
                    getcart();
                  }
                } else {
                  navigate("/login");
                }
              }}
            >
              {cartdetails.cart?.find((value) => value._id === _id && token) ? (
                <Link to="/cart">Go To Cart</Link>
              ) : (
                "Add to Cart"
              )}
            </button>

            <button
              onClick={() => {
                if (token) {
                  if (
                    wishlistdata?.wishlist?.find((value) => value._id === _id)
                  ) {
                    navigate("/wishList");
                  } else {
                    updateWishlist(product);
                  }
                } else {
                  navigate("/login");
                }
              }}
            >
              {wishlistdata?.wishlist?.find((value) => value._id === _id) ? (
                <Link to="/wishList">Go To Wishlist</Link>
              ) : (
                "Add to WishList"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
