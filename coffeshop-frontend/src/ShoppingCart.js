import NavBar from "./components/NavBar";
import "./css/shoppingCart.css";

function ShoppingCart() {
  return (
    <div>
      {/* Nav bar */}
      <NavBar />

      <h1>Shopping cart</h1>

      <form action="idk" method="post">
        {/** List of products, price and quantity */}
        <ul>
          <li>
            <fieldset>
              <legend>Your products</legend>

              <img src="images/coffe placeholder.jpg" alt="product" />

              <div className="product-description">
                <h2>Product name</h2>
                <p>$ 00.00</p>
              </div>

              <label>
                Quantity:
                <input name="productQuantity" type="number" />
              </label>

              <input name="removeProduct" type="button" />
            </fieldset>
          </li>
        </ul>
        <p>
          Sub total <strong>$ 00.00</strong>
        </p>
        <input name="checkoutButton" type="button" />
      </form>
    </div>
  );
}

export default ShoppingCart;
