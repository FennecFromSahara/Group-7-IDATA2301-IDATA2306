import NavBar from "../../components/NavBar";
import Checkout from "./Checkout";

function CheckoutPage(props) {
  const user = props.user;

  return (
    <div>
      <NavBar user={user} />

      <Checkout />
    </div>
  );
}

export default CheckoutPage;
