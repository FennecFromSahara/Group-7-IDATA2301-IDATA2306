import ProductCard from "./ProductCard";
import { useFetch } from "../hooks/useFetch";

function ProductOverview() {
  const { products, loading, error } = useFetch(
    "http://localhost:8042/api/products"
  );

  const renderProducts = () => {
    if (error) {
      console.log(error);

      return (
        <div className="product-container">
          <p className="error">Something went wrong...</p>
        </div>
      );
    } else if (products.length > 0) {
      return (
        <div className="product-container">
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <ProductCard product={product} key={product.id} />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="product-container">
          <p className="loading">{loading}</p>
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

  // /**
  //  * From example 13-rest-api-request
  //  */
  // function loadProducts() {
  //   fetch("http://localhost:8042/api/products")
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error("Something went wrong");
  //     })
  //     .then((responseJson) => {
  //       setProducts(responseJson);
  //     })
  //     .catch((e) => {
  //       onProductLoadError(e);
  //     });
  // }

  // /**
  //  * From example 13-rest-api-request
  //  */
  // function onProductLoadError(message) {
  //   setErrorMessage("ERROR: " + message);
  // }
}

export default ProductOverview;
