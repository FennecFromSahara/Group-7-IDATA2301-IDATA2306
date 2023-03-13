import NavBar from "./components/NavBar";
import "./css/landingPage.css";
import ProductCard from "./components/ProductCard";

function LandingPage() {
  return (
    <div>
      {/* Nav bar */}
      <NavBar />

      <main>
        {/* Hero section */}
        <div className="hero-image">
          <div className="hero-info-box">
            <p>We sell coffe'n stuff</p>
            <form action="#landing-product-overview">
              <input type="submit" value="View our products" />
            </form>
          </div>
        </div>

        {/* Product overview */}
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

        {/* Footer */}
        <div className="landing-footer">
          <h1>Contact</h1>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
