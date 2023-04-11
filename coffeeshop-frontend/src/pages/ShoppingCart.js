import NavBar from "../components/NavBar";
import "../css/shoppingCart.css";
import { Link } from "react-router-dom";

function ShoppingCart() {
  return (
    <div>
      <NavBar />

      <h1>Shopping cart</h1>

      <form action="idk" method="post">
        {/** List of products, price and quantity */}
        <ul>
          <li>
            <fieldset>
              <legend>Your products</legend>

              <img
                src="img/coffe placeholder.jpg"
                alt="product"
                width={"180px"}
              />

              <div className="product-description">
                <h2>Product name</h2>
                <p>$ 00.00</p>
              </div>

              <label>
                Quantity:
                <input name="productQuantity" type="number" />
              </label>

              <input
                name="removeProduct"
                type="button"
                value="Remove product"
              />
            </fieldset>
          </li>
        </ul>
        <p>
          Sub total <strong>$ 00.00</strong>
        </p>
        <Link to={"/checkout"}>
          <input name="checkoutButton" type="button" value="Go to Checkout" />
        </Link>
      </form>
    </div>
  );
}

export default ShoppingCart;
