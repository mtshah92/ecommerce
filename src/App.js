import { Routes, Route } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import { Home } from "./pages/home/Home";
import { ProductList } from "./pages/productListing/productListing";
import { WishList } from "./pages/wishList/wishList";
import { Cart } from "./pages/cart/cart";
import { Login } from "./pages/login/login";
import { Profile } from "./pages/profile/profile";
import { RequireAuth } from "./components/auth/RequireAuth";
import { SignUp } from "./pages/signup/signup";
import { NavBar } from "./components/navigation/navigation";

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="/wishList"
          element={
            <RequireAuth>
              <WishList />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              {" "}
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
