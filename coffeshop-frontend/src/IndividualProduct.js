import "./css/individual-product.css";
import NavBar from "./components/NavBar";

function IndividualProduct({ productName, productPrice }) {
  return (
    <div>
      {/* Nav bar */}
      <NavBar />

      <main>
        <div class="individual-product-wrapper">
          <div class="product-img">
            <img
              src="images/coffe placeholder.jpg"
              alt="Image of product"
              height="420"
              width="327"
            />
          </div>
          <div class="product-info">
            <div class="product-text">
              <h1>{productName}</h1>
              <p>Product description</p>
              <select name="sizes">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>
            <div class="product-price-btn">
              <p>
                $<span>{productPrice}</span>
              </p>
              <button type="button">buy now</button>
            </div>
          </div>
          <div class="product-reviews">
            <h1>Reviews (6)</h1>
            <p>
              <i>*great reviews*</i>
            </p>
          </div>
        </div>

        {/** Footer */}
        <div class="landing-footer">
          <h1>Contact</h1>
        </div>
      </main>
    </div>
  );
}

export default IndividualProduct;
