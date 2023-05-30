import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Box, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import ShoppingCartProductCard from "./ShoppingCartProductCard";
import { getShoppingCart, getShoppingCartTotal } from "../../hooks/apiService";
import Alert from "../../components/Alert";
import { useTheme } from "@emotion/react";

export default function ShoppingCart() {
  const theme = useTheme();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
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

  const updateTotal = (priceChange) => {
    setTotal(total + priceChange);
  };

  const renderProducts = () => {
    console.log("shoppingcart" + shoppingCart);
    if (shoppingCart.length === 0) {
      return <Typography variant="h3">No items in cart</Typography>;
    } else {
      return (
        <>
          {shoppingCart.map((shoppingCartProduct) => {
            console.log("stuff:" + shoppingCartProduct.userId);
            return (
              <ShoppingCartProductCard
                key={shoppingCartProduct.productId}
                shoppingCartProduct={shoppingCartProduct}
                deleteFunction={deleteShoppingCartProduct}
                updateTotal={updateTotal}
                setAlertOpen={setAlertOpen}
                setAlertState={setAlertState}
                setAlertMessage={setAlertMessage}
              />
            );
          })}
        </>
      );
    }
  };

  /**
   * Delete the product with given ID from the product list
   * @param shoppingCartProductId ID of the product to delete (ID, not index of the item in the array!)
   */
  function deleteShoppingCartProduct(shoppingCartProductId) {
    console.log("delete shoppingcart product " + shoppingCartProductId);
    const filteredCart = shoppingCart.filter(
      (shoppingCartProduct) => shoppingCartProduct.id !== shoppingCartProductId
    );
    setAlertState("warning");
    setAlertMessage("Product removed from cart");
    setAlertOpen(true);
    setShoppingCart(filteredCart);
  }

  return (
    <>
      <Container sx={{ py: 8, minHeight: theme.boxSizes.full }}>
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
      </Container>
    </>
  );
}
