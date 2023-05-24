import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import ShoppingCartProductCard from "./ShoppingCartProductCard";
import { getShoppingCart, getShoppingCartTotal } from "../../hooks/apiService";

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [total, setTotal] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shoppingCartData = await getShoppingCart();
        setShoppingCart(shoppingCartData);

        const totalData = await getShoppingCartTotal();
        setTotal(totalData);
        
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
            <Typography mr={2}>Sub total: ${total}</Typography>
            <Button variant="contained" href="/checkout">
              Checkout
            </Button>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
