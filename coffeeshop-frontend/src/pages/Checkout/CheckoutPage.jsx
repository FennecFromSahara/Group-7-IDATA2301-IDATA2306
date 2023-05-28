import NavBar from "../../components/NavBar";
import Checkout from "./Checkout";
import React from "react";

/**
 * Displays a checkout page for the products in a users shoppingcart.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function CheckoutPage() {
  return (
    <div>
      <NavBar />

      <Checkout />
    </div>
  );
}

export default CheckoutPage;
