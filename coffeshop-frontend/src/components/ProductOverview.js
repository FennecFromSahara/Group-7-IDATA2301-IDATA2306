import ProductCard from "./ProductCard";

function ProductOverview() {
  return (
    <div>
      <div className="landing-product-overview" id="landing-product-overview">
        <h1>Products</h1>
        <div className="product-container">
          <div className="product-item">
            <ProductCard productName={"Product1"} productPrice={"0.01"} />
          </div>
          <div className="product-item">
            <ProductCard productName={"Product2"} productPrice={"0.02"} />
          </div>
          <div className="product-item">
            <ProductCard productName={"Product3"} productPrice={"0.03"} />
          </div>
          <div className="product-item">
            <ProductCard productName={"Product4"} productPrice={"0.04"} />
          </div>
          <div className="product-item">
            <ProductCard productName={"Product5"} productPrice={"0.05"} />
          </div>
          <div className="product-item">
            <ProductCard productName={"Product6"} productPrice={"0.06"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductOverview;
