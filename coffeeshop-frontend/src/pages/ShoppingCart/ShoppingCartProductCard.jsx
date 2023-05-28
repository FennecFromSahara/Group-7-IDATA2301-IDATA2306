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
import {
  deleteProductFromShoppingCartRequest,
  getProductById,
  patchShoppingCartProductQuantity,
} from "../../hooks/apiService";
import { iconImageMap } from "../../components/ProductImageMapping";

/**
 * A component representing a product card for the shoppingCart page
 *
 * @returns {JSX.Element} The rendered React component.
 */
export default function ShoppingCartProductCard(props) {
  const shoppingCartProduct = props.shoppingCartProduct;
  const setAlertOpen = props.setAlertOpen;
  const setAlertState = props.setAlertState;
  const setAlertMessage = props.setAlertMessage;

  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(shoppingCartProduct.quantity);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProduct = await getProductById(shoppingCartProduct.productId);
        setProduct(userProduct);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      }
    };

    fetchData();
  }, [shoppingCartProduct.productId]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const increaseAmount = async () => {
    try {
      const requestBody = {
        id: shoppingCartProduct.id,
        userId: shoppingCartProduct.userId,
        productId: shoppingCartProduct.productId,
        quantity: quantity + 1,
      };

      patchShoppingCartProductQuantity(requestBody);

      setQuantity(quantity + 1);

      setAlertState("success");
      setAlertMessage("Product count increased");
      setAlertOpen(true);

      props.updateTotal(product.price);
    } catch (error) {
      console.error(error);

      setAlertState("error");
      setAlertMessage("Error increasing product in cart.");
      setAlertOpen(true);
    }
  };

  const decreaseAmount = async () => {
    try {
      const requestBody = {
        id: shoppingCartProduct.id,
        userId: shoppingCartProduct.userId,
        productId: shoppingCartProduct.productId,
        quantity: quantity - 1,
      };

      if (quantity - 1 <= 0) {
        setAlertState("error");
        setAlertMessage("Cannot reduce below 1");
        setAlertOpen(true);
      } else {
        patchShoppingCartProductQuantity(requestBody);
        setQuantity(quantity - 1);
        setAlertState("warning");
        setAlertMessage("Product count decreased");
        setAlertOpen(true);
        props.updateTotal(-product.price);
      }
    } catch (error) {
      console.error(error);
      setAlertState("error");
      setAlertMessage("Error decreasing product in cart.");
      setAlertOpen(true);
    }
  };

  const deleteProductFromCart = async () => {
    try {
      deleteProductFromShoppingCartRequest(product.id);
      props.deleteFunction(shoppingCartProduct.id);
      props.updateTotal(-product.price * quantity);
    } catch (error) {
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
        image={iconImageMap[product.image] || iconImageMap["placeholder"]}
        alt="Image of product"
        sx={{ width: "100px" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography>{product.price} Kr</Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs="auto">
            <Button size="small" onClick={decreaseAmount}>
              <RemoveIcon />
            </Button>
          </Grid>
          <Grid
            item
            xs={true}
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            {quantity}
          </Grid>
          <Grid item xs="auto">
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
