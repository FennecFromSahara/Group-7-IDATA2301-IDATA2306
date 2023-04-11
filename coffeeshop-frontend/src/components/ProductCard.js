import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * A component representing a product card
 * @param product the product to be displayed
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProductCard(props) {
  return (
    <Card sx={{ maxWidth: 270 }} elevation={0}>
      <CardActionArea>
        <Link to={`/products/${props.product.id}`}>
          <CardMedia
            component="img"
            image="./img/coffe placeholder.jpg"
            alt="Image of product"
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          $ {props.product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" variant="contained">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
