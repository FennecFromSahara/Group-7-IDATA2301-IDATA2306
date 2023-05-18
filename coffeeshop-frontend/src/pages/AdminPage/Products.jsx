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
import { styled } from "@mui/material/styles";
import ProductCreate from "./ProductCreate";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.primary,
  fontSize: "1.5rem",
  fontWeight: 600,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary.contrastText,
  },
  "&:hover": {
    backgroundColor: theme.palette.background.hover,
  },
}));

const Products = ({ products, setProduct, addProduct }) => {
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
              <TableCell align="center">${product.price.toFixed(2)}</TableCell>
              <TableCell align="left">{product.description}</TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: "1.5rem",
                }}
              >
                {product.inventoryAmount}
              </TableCell>
              <TableCell align="right">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreatingProduct(true)}
        sx={{ ml: 3, mb: 3 }}
      >
        Add Product
      </Button>
    </TableContainer>
  );
};

export default Products;
