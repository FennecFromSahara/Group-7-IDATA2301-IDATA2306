import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProductOverview from "./ProductOverview";
import React from "react";

function Products() {
  return (
    <div>
      <NavBar />

      <ProductOverview />

      <Footer />
    </div>
  );
}

export default Products;
