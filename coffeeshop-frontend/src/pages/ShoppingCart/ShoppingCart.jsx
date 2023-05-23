import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import ShoppingCartProductCard from "./ShoppingCartProductCard";
import { getShoppingCart } from "../../hooks/apiService";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ShoppingCart() {
  const [status, setStatus] = useState("loading");
  const [shoppingCart, setShoppingCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shoppingCartData = await getShoppingCart();
        setShoppingCart(shoppingCartData);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  const renderProducts = () => {
    console.log("shoppingcart" + shoppingCart);
    return (
      <>
        {shoppingCart.map((shoppingCartProduct) => {
          console.log("stuff:" + shoppingCartProduct.userId);
          return (
            <ShoppingCartProductCard
              key={shoppingCartProduct.productId}
              shoppingCartProduct={shoppingCartProduct}
            />
          );
        })}
      </>
    );
  };

  return (
    <div>
      <Container sx={{ py: 8 }}>
        <Stack spacing={2}>
          {renderProducts()}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography mr={2}>Sub total: $"amount"</Typography>
            <Button variant="contained" href="/checkout">
              Checkout
            </Button>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
