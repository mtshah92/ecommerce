import { Routes, Route } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import { Home } from "./pages/Home";
import { NavBar } from "./components/navigation";
import { ProductList } from "./pages/productListing";

function App() {
  return (
    <div className="App">
      <h2>App</h2>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </div>
  );
}

export default App;
