import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { asyncApiRequest } from "../tools/requests";

/**
 * A component representing a product card
 * @param product the product to be displayed
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProductCard(props) {
  const user = props.user;
  const product = props.product;

  const addToCart = async () => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }

    console.log(user.id);
    console.log(product.id);

    try {
      const requestBody = {
        userId: user.id,
        productId: product.id,
        quantity: 1,
      };
      await asyncApiRequest("POST", "/order/add-to-cart", requestBody);
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
            image="./img/coffe placeholder.jpg"
            alt="Image of product"
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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
