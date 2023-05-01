import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProductOverview from "../../components/ProductOverview";

function Products(props) {
  const user = props.user;

  return (
    <div>
      <NavBar user={user} />

      <ProductOverview maxIndex={12} user={user} />

      <Footer />
    </div>
  );
}

export default Products;
