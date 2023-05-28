import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import imageMap from "../../components/ProductImageMapping";
import { addToCartRequest } from "../../hooks/apiService";
import Alert from "../../components/Alert";

/**
 * A component representing a product card. It displays information about
 * a product.
 *
 * @returns {JSX.Element}
 */
export default function ProductCard(props) {
  const { user } = useAuth();
  const product = props.product;
  const [alertState, setAlertState] = useState("idle");
  const [open, setOpen] = React.useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      setAlertState("error-login");
      setOpen(true);
      return;
    }

    try {
      const requestBody = {
        userId: user.id,
        productId: product.id,
        quantity: 1,
      };

      await addToCartRequest(requestBody);
      setAlertState("success");
      setOpen(true);
    } catch (error) {
      console.error(error);
      setAlertState("error");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let alertTitle = "";
  let alertSeverity = "";

  if (alertState === "success") {
    alertTitle = "Product added to cart successfully.";
    alertSeverity = "success";
  } else if (alertState === "error") {
    alertTitle = "Error adding product to cart.";
    alertSeverity = "error";
  } else if (alertState === "error-login") {
    alertTitle = "Please log in to add items to the cart.";
    alertSeverity = "error";
  }

  return (
    <Card sx={{ maxWidth: 270 }} elevation={0}>
      <CardActionArea>
        <Link to={`/products/${product.id}`}>
          <CardMedia
            component="img"
            height="270"
            image={imageMap[product.image] || imageMap["placeholder"]}
            alt={`Image of ${product.name}`}
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic", mt: -1 }}
        >
          {product.categories.map((category) => category.name).join(", ")}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ pt: 1.5, fontWeight: 600, mb: -2 }}
        >
          {product.price} Kr
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" variant="contained" onClick={handleAddToCart}>
          Add to cart
        </Button>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ mt: "8vh", ml: "12vw" }}
        >
          <Alert
            onClose={handleClose}
            severity={alertSeverity}
            alertState={alertState}
          >
            {alertTitle}
          </Alert>
        </Snackbar>
      </CardActions>
    </Card>
  );
}
