import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Stack } from "@mui/material";
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
      elevation={0}
    >
      <CardMedia
        component="img"
        image={iconImageMap[product.image] || iconImageMap["placeholder"]}
        alt="Image of product"
        sx={{ width: "100px", margin: 1 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography>{product.price} Kr</Typography>
      </CardContent>
      <CardActions>
        <Stack direction={{ xs: "column", sm: "row" }}>
          <Button size="small" onClick={decreaseAmount}>
            <RemoveIcon />
          </Button>

          <Typography
            variant="body1"
            textAlign={"center"}
            fontSize={"1.5rem"}
            fontWeight={700}
          >
            {quantity}
          </Typography>

          <Button size="small" onClick={increaseAmount}>
            <AddIcon />
          </Button>

          <Button size="small" onClick={deleteProductFromCart}>
            <HighlightOffIcon />
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
