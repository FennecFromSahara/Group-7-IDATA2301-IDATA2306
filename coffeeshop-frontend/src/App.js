import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import LoginPage from "./pages/LoginPage";
import IndividualProduct from "./pages/IndividualProduct";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<IndividualProduct />} />
      <Route path="/shoppingCart" element={<ShoppingCart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/createUser" element={<CreateUser />} />

      {/** TODO: IMPLEMENT NOT FOUND SITE */}
      <Route path="*" element={<h1>404: Not Found</h1>} />
    </Routes>
  );
}

export default App;
