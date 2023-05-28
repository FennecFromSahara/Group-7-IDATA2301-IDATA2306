import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProductOverview from "./ProductOverview";
import React from "react";

/**
 * Displays the products page, it includes the NavBar, ProductOverview
 * and Footer.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function Products() {
  return (
    <>
      <NavBar />

      <ProductOverview />

      <Footer />
    </>
  );
}

export default Products;
