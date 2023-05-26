import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { asyncApiRequest } from "../../tools/requests";
import { useAuth } from "../../hooks/useAuth";

import placeholderImage from "../../assets/img/coffee placeholder.jpg";

/**
 * A component representing a product card
 * @param product the product to be displayed
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProductCard(props) {
  const { user } = useAuth();
  const product = props.product;

  const addToCart = async () => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }

    console.log("User id: " + user.id);
    console.log("Product id: " + product.id);

    try {
      const requestBody = {
        userId: user.id,
        productId: product.id,
        quantity: 1,
      };
      await asyncApiRequest("POST", "/orders/add-to-cart", requestBody, true);
      alert("Product added to cart successfully.");
    } catch (error) {
      alert("Error adding product to cart.");
      console.error(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 270 }} elevation={0}>
      <CardActionArea>
        <Link to={`/products/${product.id}`}>
          <CardMedia
            component="img"
            height="270"
            image={placeholderImage}
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
        <Button size="small" variant="contained" onClick={addToCart}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
