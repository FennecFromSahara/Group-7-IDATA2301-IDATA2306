import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { asyncApiRequest } from "../../tools/requests";
import { useAuth } from "../../hooks/useAuth";
import imageMap from "../../components/ProductImageMapping";
import { addToCart } from "../../tools/addToCart";

/**
 * A component representing a product card
 * @param product the product to be displayed
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProductCard(props) {
  const { user } = useAuth();
  const product = props.product;

  const image = imageMap[product.image];

  return (
    <Card sx={{ maxWidth: 270 }} elevation={0}>
      <CardActionArea>
        <Link to={`/products/${product.id}`}>
          <CardMedia
            component="img"
            height="270"
            image={image}
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
        <Button
          size="small"
          variant="contained"
          onClick={() => addToCart(user, product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
