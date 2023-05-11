import LandingPage from "./pages/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import ShoppingCartPage from "./pages/ShoppingCart/ShoppingCartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Products from "./pages/Products/Products";
import LoginPage from "./pages/LoginPage/LoginPage";
import IndividualProduct from "./pages/IndividualProduct/IndividualProduct";
import CreateUser from "./pages/CreateUser/CreateUser";
import Secret from "./pages/Secret/Secret";
import AdminPage from "./pages/AdminPage/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import NoAccessPage from "./pages/AdminPage/NoAccessPage";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<IndividualProduct />} />
        <Route path="/shoppingCart" element={<ShoppingCartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/veryRealURL" element={<Secret />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/access_denied" element={<NoAccessPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
