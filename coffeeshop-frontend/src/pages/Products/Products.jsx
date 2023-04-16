import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProductOverview from "../../components/ProductOverview";

function Products() {
  return (
    <div>
      <NavBar />

      <ProductOverview maxIndex={12} />

      <Footer />
    </div>
  );
}

export default Products;