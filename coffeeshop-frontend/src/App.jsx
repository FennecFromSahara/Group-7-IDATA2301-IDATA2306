import LandingPage from "./pages/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import ShoppingCartPage from "./pages/ShoppingCart/ShoppingCartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Products from "./pages/Products/Products";
import LoginPage from "./pages/LoginPage/LoginPage";
import IndividualProduct from "./pages/IndividualProduct/IndividualProduct";
import CreateUser from "./pages/CreateUser/CreateUser";
import Secret from "./pages/Secret/Secret";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useState, useEffect } from "react";
import { getAuthenticatedUser } from "./tools/authentication";

function App() {
  const [user, setUser] = useState(null);

  useEffect(tryRestoreUserSession);

  // Perform user logout
  //
  // function doLogout() {
  //   console.log("Logout");
  //   deleteAuthorizationCookies();
  //   setUser(null);
  // }

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} />} />
      <Route path="/about" element={<About user={user} />} />
      <Route path="/products" element={<Products user={user} />} />
      <Route path="/products/:id" element={<IndividualProduct user={user} />} />
      <Route path="/shoppingCart" element={<ShoppingCartPage />} />
      <Route
        path="/login"
        element={<LoginPage user={user} setUser={setUser} />}
      />
      <Route path="/checkout" element={<CheckoutPage user={user} />} />
      <Route path="/createUser" element={<CreateUser user={user} />} />
      <Route path="/veryRealURL" element={<Secret user={user} />} />
      <Route path="/admin" element={<AdminPage user={user} />} />

      {/** TODO: IMPLEMENT NOT FOUND SITE */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  /**
   * Check cookies - is user logged in? If so, set the user from cookies
   */
  function tryRestoreUserSession() {
    if (!user) {
      const loggedInUser = getAuthenticatedUser();
      if (loggedInUser) {
        console.log("User session found in cookies, restoring");
        setUser(loggedInUser);
        console.log(loggedInUser.id);
      }
    }
  }
}

export default App;
