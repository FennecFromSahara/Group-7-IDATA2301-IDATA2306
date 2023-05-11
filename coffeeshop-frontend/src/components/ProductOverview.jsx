import ProductCard from "./ProductCard";
import { useFetch } from "../hooks/useFetch";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";

function ProductOverview(props) {
  const { data, error } = useFetch("http://localhost:8042/api/products");
  const [status, setStatus] = useState("loading");
  const [productsDisplayed, setProductsDisplayed] = useState(props.maxIndex);

  useEffect(() => {
    if (error) {
      setStatus("error");
    } else if (data.length > 0) {
      setStatus("loaded");
    } else {
      setStatus("loading");
    }
  }, [error, data]);

  const increaseDisplayedProducts = () => {
    if (productsDisplayed >= data.length) {
      alert("No more products to display");
    } else {
      setProductsDisplayed(
        (prevProductsDisplayed) =>
          prevProductsDisplayed +
          Math.min(6, data.length - prevProductsDisplayed)
      );
    }
  };
  const renderProducts = () => {
    if (status === "loaded") {
      return (
        <>
          {data.map((product, index) => {
            if (index < productsDisplayed) {
              return (
                <Grid item xs={2} sm={4} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              );
            }
            return null;
          })}
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: "1rem 3rem 3rem 3rem",
      }}
    >
      <Typography variant="h1">
        Products
        {status === "loading"
          ? ": Loading..."
          : status === "error"
          ? ": Something went wrong..."
          : ""}
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: 900 }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {renderProducts()}
          </Grid>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", marginTop: "2rem" }}
      >
        <Button variant="contained" onClick={increaseDisplayedProducts}>
          Show more
        </Button>
      </Box>
    </Box>
  );
}

export default ProductOverview;
