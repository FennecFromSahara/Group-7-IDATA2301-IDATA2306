import NavBar from "../../components/NavBar";
import ShoppingCart from "./ShoppingCart";

function ShoppingCartPage(props) {
  const user = props.user;

  return (
    <div>
      <NavBar user={user} />

      <ShoppingCart />
    </div>
  );
}

export default ShoppingCartPage;
