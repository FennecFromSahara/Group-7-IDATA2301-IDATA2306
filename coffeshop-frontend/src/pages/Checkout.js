import NavBar from "../components/NavBar";
import "../css/checkout.css";

function Checkout() {
  return (
    <div>
      <NavBar />

      <h1>Checkout</h1>
      <p>Enter the necessary details below</p>

      <form action="idk" method="post" id="checkout-form">
        {/* Contact information form */}
        <fieldset id="contact-information-fieldset">
          <legend>Contact information</legend>
          <label>
            Your first name:
            <input name="firstName" type="text" placeholder="Firstname" />
          </label>
          <br />
          <label>
            Your last name:
            <input name="lastName" type="text" placeholder="Lastname" />
          </label>
          <br />
          <label>
            Your address:
            <input name="address" type="text" placeholder="" />
          </label>
          <br />
          <label>
            Your email:
            <input
              name="email"
              type="email"
              placeholder="someone@something.stuff"
            />
          </label>
          <br />
          <label>
            Your phone number:
            <input
              name="phoneNumber"
              type="number"
              placeholder="8921839"
            ></input>
          </label>
        </fieldset>

        {/* Shipping information form */}
        <fieldset id="shipping-fieldset">
          <legend>Shipping</legend>
          <label>
            Post code:
            <input name="postCode" type="number" />
          </label>

          <label for="shippingAddress">Delivery location:</label>
          <select name="shippingAddress">
            <option>Obs stormoa</option>
            <option>Rema 1000 Gåseid</option>
            <option>Joker kolvikbakken</option>
          </select>
        </fieldset>
      </form>

      {/* Button to payment page */}
      <input type="button" name="paymentButton"></input>
    </div>
  );
}

export default Checkout;
