import "./individual-product.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import CardMedia from "@mui/material/CardMedia";

function IndividualProduct() {
  const { id } = useParams();
  const { data, error } = useFetch(`http://localhost:8042/api/products/${id}`);

  const renderProducts = () => {
    if (error) {
      return <h1>Something went wrong...</h1>;
    } else {
      return (
        <div>
          <div className="product-img">
            <CardMedia
              component="img"
              image="../img/coffe placeholder.jpg"
              alt="Image of product"
              sx={{ height: 420, width: 327 }}
            />
          </div>
          <div className="product-info">
            <div className="product-text">
              <h1>{data.name}</h1>
              <p>{data.description}</p>
              <select name="sizes">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>
            <div className="product-price-btn">
              <p>
                $<span>{data.price}</span>
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
      );
    }
  };

  return (
    <div>
      <NavBar />
      <main>
        <div className="individual-product-wrapper">{renderProducts()}</div>
      </main>
      <Footer />
    </div>
  );
}

export default IndividualProduct;
