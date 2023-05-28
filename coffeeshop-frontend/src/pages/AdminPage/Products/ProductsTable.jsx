import { useTheme } from "@emotion/react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../Components/StyledTable";
import ProductCreate from "./ProductCreate";
import React from "react";
import imageMap from "../../../components/ProductImageMapping";

/**
 * Displays a table of all products in the database.
 *
 * @returns {JSX.Element} The rendered React component.
 */
const ProductsTable = ({ products, setProduct, addProduct }) => {
  const theme = useTheme();
  const [creatingProduct, setCreatingProduct] = useState(false);

  if (creatingProduct) {
    return (
      <ProductCreate
        setCreatingProduct={setCreatingProduct}
        addProduct={addProduct}
      />
    );
  }

  return (
    <TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreatingProduct(true)}
        sx={{ ml: 3, mt: 3 }}
      >
        Add Product
      </Button>

      <Table
        sx={{
          m: 3,
          maxWidth: "95%",
          backgroundColor: theme.palette.background.paper,
          border: `3px solid ${theme.palette.primary.light}`,
        }}
        aria-label="product table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Product Name</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Inventory Amount</StyledTableCell>
            <StyledTableCell align="center">Categories</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <StyledTableRow
              key={product.id}
              onClick={() => setProduct(product)}
            >
              <TableCell component="th" scope="row" align="center">
                {product.name}
              </TableCell>
              <TableCell align="center">
                {product.price.toFixed(2)} Kr
              </TableCell>
              <TableCell align="left">{product.description}</TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: "1.5rem",
                }}
              >
                {product.inventoryAmount}
              </TableCell>
              <TableCell align="center">
                {product.categories.map((category) => category.name).join(", ")}
              </TableCell>
              <TableCell align="right">
                {product.image && (
                  <img
                    src={imageMap[product.image] || imageMap["placeholder"]}
                    alt={product.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
