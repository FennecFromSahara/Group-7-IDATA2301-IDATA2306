import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { getProductById } from "../../hooks/apiService";

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
        <Typography>
          {product.price} Kr
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2} key={product.id}> 
          <Grid item xs={4}>
            <Button size="small">
              <RemoveIcon />
            </Button>
          </Grid>
          <Grid item xs={4}>
            {shoppingCartProduct.quantity}
          </Grid>
          <Grid item xs={4}>
            <Button size="small">
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Button size="small">
          <HighlightOffIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
