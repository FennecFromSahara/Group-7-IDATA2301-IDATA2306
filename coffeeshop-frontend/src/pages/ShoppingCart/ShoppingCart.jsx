import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import ShoppingCartProductCard from "./ShoppingCartProductCard";
import { getShoppingCart, getShoppingCartTotal } from "../../hooks/apiService";
import { useTheme } from "@emotion/react";

/**
 * Represents the shoppingcart for the user.
 * It displays the products in a list.
 *
 * @returns {JSX.Element} The rendered React component.
 */
export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const theme = useTheme();

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

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

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
    setShoppingCart(filteredCart);
  }

  return (
    <Container sx={{ py: 8, minHeight: theme.boxSizes.navSectionFooter }}>
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
  );
}
