import React from "react";
import { useTheme } from "@emotion/react";
import { StyledTableCell, StyledTableRow } from "../Components/StyledTable";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrdersTable = ({ orders, setOrder }) => {
  const theme = useTheme();

  return (
    <TableContainer>
      <Table
        sx={{
          m: 3,
          maxWidth: "95%",
          backgroundColor: theme.palette.background.paper,
          border: `3px solid ${theme.palette.primary.light}`,
        }}
        aria-label="order table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Order ID</StyledTableCell>
            <StyledTableCell align="center">User</StyledTableCell>
            <StyledTableCell align="center">Total Quantity</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Created At</StyledTableCell>
            <StyledTableCell align="center">Order Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orders) &&
            orders.map((order) => {
              const totalQuantity = order.orderProducts.reduce(
                (acc, product) => acc + product.quantity,
                0
              );

              return (
                <StyledTableRow key={order.id} onClick={() => setOrder(order)}>
                  <TableCell component="th" scope="row" align="center">
                    {order.id}
                  </TableCell>
                  <TableCell align="center">{order.username}</TableCell>
                  <TableCell align="center">{totalQuantity}</TableCell>
                  <TableCell align="center">{order.totalPrice}</TableCell>
                  <TableCell align="center">
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">{order.orderStatus}</TableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
