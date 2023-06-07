import { Routes, Route } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import { Home } from "./pages/Home";
import { NavBar } from "./components/navigation";
import { ProductList } from "./pages/productListing";
import { WishList } from "./pages/wishList";
import { Cart } from "./pages/cart";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { RequireAuth } from "./components/RequireAuth";
import { SignUp } from "./pages/signup";

function App() {
  return (
    <div className="App">
      <NavBar />
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
