import "../css/individual-product.css";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

function IndividualProduct() {
  const { productName } = useParams();
  const productPrice = "TODO";

  return (
    <div>
      {/* Nav bar */}
      <NavBar />

      <main>
        <div className="individual-product-wrapper">
          <div className="product-img">
            <input
              type="image"
              img
              src={"./img/coffe placeholder.jpg"}
              alt="Image of product"
              style={{ height: 420, width: 327 }}
            />
          </div>
          <div className="product-info">
            <div className="product-text">
              <h1>{productName}</h1>
              <p>Product description</p>
              <select name="sizes">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>
            <div className="product-price-btn">
              <p>
                $<span>{productPrice}</span>
              </p>
              <button type="button">buy now</button>
            </div>
          </div>
          <div className="product-reviews">
            <h1>Reviews (6)</h1>
            <p>
              <i>*great reviews*</i>
            </p>
          </div>
        </div>

        {/** Footer */}
        <div className="landing-footer">
          <h1>Contact</h1>
        </div>
      </main>
    </div>
  );
}

export default IndividualProduct;
