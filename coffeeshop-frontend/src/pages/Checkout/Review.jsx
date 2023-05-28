import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import {
  getShoppingCart,
  getProductById,
  getShoppingCartTotal,
} from "../../hooks/apiService";

/**
 * Represents the review-portion of the checkout.
 *
 * @returns {JSX.Element} The rendered React component.
 */
export default function Review({ addressInfo, paymentInfo }) {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [total, setTotal] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shoppingCartData = await getShoppingCart();
        setShoppingCart(shoppingCartData);

        const fetchedProducts = [];

        for (const item of shoppingCartData) {
          const product = await getProductById(item.productId);
          fetchedProducts.push(product);
        }

        setProducts(fetchedProducts);

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

  const addresses = [
    addressInfo.address1,
    addressInfo.address2,
    addressInfo.city,
    addressInfo.state,
    addressInfo.zip,
    addressInfo.country,
  ];

  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: paymentInfo.cardName },
    { name: "Card number", detail: paymentInfo.cardNumber },
    { name: "Expiry date", detail: paymentInfo.expDate },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => {
          // Find the item in the shopping cart that matches the current product's ID
          const cartItem = shoppingCart.find(
            (item) => item.productId === product.id
          );

          // Get the quantity from the cart item, defaulting to 0 if not found
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={product.name}
                secondary={`Quantity: ${quantity}`}
              />
              <Typography variant="body2">{product.price} kr</Typography>
            </ListItem>
          );
        })}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total} kr
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
