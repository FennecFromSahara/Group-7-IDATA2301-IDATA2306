import React, { useState } from "react";
import {
  Button,
  Box,
  Grid,
  Typography,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { asyncApiRequest } from "../../../tools/requests";
import Alert from "../../../components/Alert";

/**
 * Displays an overview of an order, with functionality to change the status
 * of the order
 *
 * @returns {JSX.Element} The rendered React component.
 */
const OrderOverview = ({ order, setOrder, updateOrders, removeOrder }) => {
  const theme = useTheme();
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);

  const orderStatusOptions = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
  ];

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const updateOrder = async () => {
    try {
      const updatedOrder = await asyncApiRequest(
        "PATCH",
        `/orders/${order.id}/${orderStatus}`
      );

      setOrder(updatedOrder);
      updateOrders(updatedOrder);

      setAlertState("success");
      setAlertMessage("Order status has been updated");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error updating order status:", error);
      setAlertState("error");
      setAlertMessage("Error updating order status");
      setAlertOpen(true);
    }
  };

  const deleteOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (confirmed) {
      try {
        await asyncApiRequest("DELETE", `/orders/${order.id}`);
        setOrder(null);
        removeOrder(order.id);
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const backToOrders = () => {
    setOrder(null);
  };

  return (
    <>
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
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 2,
          borderRadius: 2,
          border: `2px solid ${theme.palette.primary.light}`,
          m: 3,
        }}
      >
        <Grid container>
          <Grid item xs>
            <Typography variant="h1" gutterBottom>
              Order id: {order.id}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={backToOrders}>
              Back
            </Button>
          </Grid>
        </Grid>
        <FormControl variant="outlined">
          <InputLabel id="order-status-label">Order Status</InputLabel>
          <Select
            labelId="order-status-label"
            value={orderStatus}
            onChange={handleStatusChange}
            label="Order Status"
            sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
          >
            {orderStatusOptions.map((status) => (
              <MenuItem
                key={status}
                value={status}
                sx={{ backgroundColor: theme.palette.primary.contrastText }}
              >
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h2" gutterBottom sx={{ mt: 2, mb: -1 }}>
          Products:
        </Typography>
        {order.orderProducts.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              sx={{ mb: -1 }}
              primary={`${product.productName}: ${product.quantity}`}
            />
          </ListItem>
        ))}
        <Typography sx={{ mt: 2 }}>
          Total Price: {order.totalPrice} kr
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={updateOrder}
          sx={{ mr: 2, mt: 2 }}
        >
          Update Order
        </Button>
        <Button
          variant="contained"
          color="danger"
          onClick={deleteOrder}
          sx={{ mr: 2, mt: 2 }}
        >
          Delete Order
        </Button>
      </Box>
    </>
  );
};

export default OrderOverview;
