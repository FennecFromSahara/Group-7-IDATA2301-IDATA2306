import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ productName, productPrice }) {
  return (
    <Card sx={{ maxWidth: 270 }} elevation={0}>
      <CardActionArea>
        <Link to={"products/" + productName}>
          <CardMedia
            component="img"
            image="./img/coffe placeholder.jpg"
            alt="Image of product"
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          $ {productPrice}
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
