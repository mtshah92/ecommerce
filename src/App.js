import { Routes, Route } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import { Home } from "./pages/Home";
import { NavBar } from "./components/navigation";
import { ProductList } from "./pages/productListing";
import { WishList } from "./pages/wishList";
import { Cart } from "./pages/cart";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishList" element={<WishList />} />
      </Routes>
    </div>
  );
}

export default App;
