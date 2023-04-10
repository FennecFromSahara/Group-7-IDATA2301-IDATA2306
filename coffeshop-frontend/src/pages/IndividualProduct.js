import "../css/individual-product.css";
import NavBar from "../components/NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IndividualProduct({}) {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (errorMessage) {
    return (
      <div>
        <NavBar />
        <main>
          <div className="individual-product-wrapper">
            <h1>{errorMessage}</h1>
          </div>
          <Footer />
        </main>
      </div>
    );
  } else {
    return (
      <div>
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
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <select name="sizes">
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                </select>
              </div>
              <div className="product-price-btn">
                <p>
                  $<span>{product.price}</span>
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
          <Footer />
        </main>
      </div>
    );
  }

  function loadProduct() {
    fetch(`http://localhost:8042/api/products/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        setProduct(responseJson);
      })
      .catch((e) => {
        onProductLoadError(e);
      });
  }

  function onProductLoadError(message) {
    setErrorMessage("404: " + message);
  }
}

export default IndividualProduct;
