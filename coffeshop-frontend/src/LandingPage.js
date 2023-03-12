function LandingPage() {
  return (
    <div>
      {/* Nav bar */}
      <header id="header">
        <nav className="nav-bar">
          <ul className="nav-links">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="#landing-product-overview">Products</a>
            </li>
          </ul>
        </nav>
        <h1 className="title">Coffe Shop</h1>
        <nav className="nav-bar">
          <ul className="nav-links">
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="shoppingcart.html">*shopping cart icon*</a>
            </li>
          </ul>
        </nav>
      </header>

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
              <div className="product-image">
                <a href="individual-product.html">
                  <img src="img/coffe placeholder.jpg" alt="product" />
                </a>
                <div>
                  <button type="button" className="add-button">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-description">
                <p className="product-name">NAME OF THE PRODUCT</p>
                <p className="product-price">$ 00.00</p>
              </div>
            </div>

            <div className="product-item">
              <div className="product-image">
                <a href="individual-product.html">
                  <img src="img/coffe placeholder.jpg" alt="product" />
                </a>
                <div>
                  <button type="button" className="add-button">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-description">
                <p className="product-name">NAME OF THE PRODUCT</p>
                <p className="product-price">$ 00.00</p>
              </div>
            </div>

            <div className="product-item">
              <div className="product-image">
                <a href="individual-product.html">
                  <img src="img/coffe placeholder.jpg" alt="product" />
                </a>
                <div>
                  <button type="button" className="add-button">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-description">
                <p className="product-name">NAME OF THE PRODUCT</p>
                <p className="product-price">$ 00.00</p>
              </div>
            </div>

            <div className="product-item">
              <div className="product-image">
                <a href="individual-product.html">
                  <img src="img/coffe placeholder.jpg" alt="product" />
                </a>
                <div>
                  <button type="button" className="add-button">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-description">
                <p className="product-name">NAME OF THE PRODUCT</p>
                <p className="product-price">$ 00.00</p>
              </div>
            </div>

            <div className="product-item">
              <div className="product-image">
                <a href="individual-product.html">
                  <img src="img/coffe placeholder.jpg" alt="product" />
                </a>
                <div>
                  <button type="button" className="add-button">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-description">
                <p className="product-name">NAME OF THE PRODUCT</p>
                <p className="product-price">$ 00.00</p>
              </div>
            </div>

            <div className="product-item">
              <div className="product-image">
                <a href="individual-product.html">
                  <img src="img/coffe placeholder.jpg" alt="product" />
                </a>
                <div>
                  <button type="button" className="add-button">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-description">
                <p className="product-name">NAME OF THE PRODUCT</p>
                <p className="product-price">$ 00.00</p>
              </div>
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
