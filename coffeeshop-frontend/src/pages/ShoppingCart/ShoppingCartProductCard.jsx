import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Grid, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState, useEffect } from "react";
import { getProductById } from "../../hooks/apiService";
import { asyncApiRequest } from "../../tools/requests";
import imageMap from "../../components/ProductImageMapping";
import Alert from "../../components/Alert";

/**
 * A component representing a product card for the shoppingCart page
 *
 * @returns {JSX.Element} The rendered React component.
 */
export default function ShoppingCartProductCard(props) {
  const shoppingCartProduct = props.shoppingCartProduct;

  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(shoppingCartProduct.quantity);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

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

  const increaseAmount = async () => {
    try {
      const requestBody = {
        id: shoppingCartProduct.id,
        userId: shoppingCartProduct.userId,
        productId: shoppingCartProduct.productId,
        quantity: quantity + 1,
      };

      await asyncApiRequest("PUT", "/shoppingCart", requestBody, true);

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

      await asyncApiRequest("PUT", "/shoppingCart", requestBody, true);

      setQuantity(quantity - 1);

      setAlertState("warning");
      setAlertMessage("Product count decreased");
      setAlertOpen(true);

      props.updateTotal(-product.price);
    } catch (error) {
      console.error(error);
      setAlertState("error");
      setAlertMessage("Error decreasing product in cart.");
      setAlertOpen(true);
    }
  };

  const deleteProductFromCart = async () => {
    try {
      await asyncApiRequest("DELETE", "/shoppingCart/" + product.id);
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
        image={imageMap[product.image] || imageMap["placeholder"]}
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
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertState}
          alertState={alertState}
        >
          {error || alertMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}
