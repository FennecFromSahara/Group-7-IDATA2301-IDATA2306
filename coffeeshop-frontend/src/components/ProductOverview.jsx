import ProductCard from "./ProductCard";
import { useFetch } from "../hooks/useFetch";

function ProductOverview() {
  const { data, error } = useFetch("http://localhost:8042/api/products");

  const renderProducts = () => {
    if (error) {
      console.log(error);

      return (
        <div className="product-container">
          <p className="error">Something went wrong...</p>
        </div>
      );
    } else if (data.length > 0) {
      return (
        <div className="product-container">
          {data.map((product) => (
            <div className="product-item" key={product.id}>
              <ProductCard product={product} key={product.id} />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="product-container">
          <p className="loading">Loading...</p>
        </div>
      );
    }
  };

  return (
    <div className="landing-product-overview" id="landing-product-overview">
      <h1>Products</h1>
      {renderProducts()}
    </div>
  );
}

export default ProductOverview;
