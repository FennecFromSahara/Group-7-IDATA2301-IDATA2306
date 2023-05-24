import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState, useEffect } from "react";
import { getProductById } from "../../hooks/apiService";
import { asyncApiRequest } from "../../tools/requests";

/**
 * A component representing a product card for the shoppingCart page
 * @param product the product to be displayed
 * @returns {JSX.Element}
 * @constructor
 */
export default function ShoppingCartProductCard(props) {
  const shoppingCartProduct = props.shoppingCartProduct;

  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(shoppingCartProduct.quantity);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProduct = await getProductById(shoppingCartProduct.productId);
        setProduct(userProduct);
        console.log("product" + product);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  const increaseAmount = async () => {
    // if (!user) {
    //   alert("Please log in to add items to the cart.");
    //   return;
    // }

    // console.log("User id: " + user.id);
    // console.log("Product id: " + product.id);

    try {
      const requestBody = {
        id: shoppingCartProduct.id,
        userId: shoppingCartProduct.userId,
        productId: shoppingCartProduct.productId,
        quantity: quantity,
      };

      await asyncApiRequest("PUT", "/shoppingCart", requestBody, true);

      setQuantity(quantity + 1);

      alert("Product count increased in cart successfully.");
    } catch (error) {
      alert("Error increasing product in cart.");
      console.error(error);
    }
  };

  const decreaseAmount = async () => {
    // if (!user) {
    //   alert("Please log in to add items to the cart.");
    //   return;
    // }

    // console.log("User id: " + user.id);
    // console.log("Product id: " + product.id);

    try {
      const requestBody = {
        id: shoppingCartProduct.id,
        userId: shoppingCartProduct.userId,
        productId: shoppingCartProduct.productId,
        quantity: shoppingCartProduct.quantity,
      };

      await asyncApiRequest("PUT", "/shoppingCart", requestBody, true);

      setQuantity(quantity - 1);

      alert("Product count decreased in cart successfully.");
    } catch (error) {
      alert("Error decreasing product in cart.");
      console.error(error);
    }
  };

  const deleteProductFromCart = async () => {
    //TODO: autorefresh
    // if (!user) {
    //   alert("Please log in to add items to the cart.");
    //   return;
    // }

    // console.log("User id: " + user.id);
    // console.log("Product id: " + product.id);

    try {
      await asyncApiRequest("DELETE", "/shoppingCart/" + product.id);
      alert("Product deleted from cart successfully.");
      props.deleteFunction(shoppingCartProduct.id);
    } catch (error) {
      alert("Error deleting product from cart.");
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        image="./img/coffe placeholder.jpg"
        alt="Image of product"
        sx={{ maxWidth: 100 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography>{product.price} Kr</Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button size="small" onClick={decreaseAmount}>
              <RemoveIcon />
            </Button>
          </Grid>
          <Grid item xs={4}>
            {quantity}
          </Grid>
          <Grid item xs={4}>
            <Button size="small" onClick={increaseAmount}>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Button size="small" onClick={deleteProductFromCart}>
          <HighlightOffIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
