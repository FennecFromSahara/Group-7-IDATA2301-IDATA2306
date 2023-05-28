import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import ShoppingCart from "./ShoppingCart";
import React from "react";

/**
 * Represents the Shopping Cart Page for a user. It contains a NavBar and ShoppingCart
 *
 * @returns {JSX.Element} The rendered React component.
 */
function ShoppingCartPage() {
  return (
    <>
      <NavBar />

      <ShoppingCart />

      <Footer />
    </>
  );
}

export default ShoppingCartPage;
