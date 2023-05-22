import { Box, Grid, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

import { getProducts } from "../hooks/apiService";
import { useTheme } from "@emotion/react";

function ProductOverview(props) {
  const [status, setStatus] = useState("loading");
  const [products, setProducts] = useState([]);
  const [productsDisplayed, setProductsDisplayed] = useState(props.maxIndex);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const theme = useTheme();

  useEffect(() => {
    getProducts()
      .then((productsData) => {
        setProducts(productsData);
        const uniqueCategories = [
          ...new Set(
            productsData.flatMap((product) =>
              product.categories.map((category) => category.name)
            )
          ),
        ];
        setCategories(uniqueCategories);
        setStatus("loaded");
        console.log(products);
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  const increaseDisplayedProducts = () => {
    if (productsDisplayed >= products.length) {
      alert("No more products to display");
    } else {
      setProductsDisplayed(
        (prevProductsDisplayed) =>
          prevProductsDisplayed +
          Math.min(6, products.length - prevProductsDisplayed)
      );
    }
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const renderProducts = () => {
    if (status === "loaded") {
      return (
        <>
          {products
            .filter((product) => {
              if (selectedCategory) {
                return product.categories.some(
                  (category) => category.name === selectedCategory
                );
              } else {
                return true;
              }
            })
            .map((product, index) => {
              if (index < productsDisplayed) {
                return (
                  <Grid item xs={1} sm={1} md={1} lg={1} key={product.id}>
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
        minHeight: theme.boxSizes.navSection,
        p: "1rem 3rem 3rem 3rem",
      }}
    >
      <Typography variant="h1">
        Products
        {status === "loading"
          ? ": Loading..."
          : status === "error"
          ? ": Something went wrong..."
          : status === "loaded"
          ? `: browse trough our ${products.length} products!`
          : ""}
      </Typography>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ minHeight: theme.boxSizes.navSection, p: "1rem 3rem 3rem 3rem" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{ minWidth: 160, mr: 8, ml: -3 }}
        >
          <Button
            variant="contained"
            onClick={() => setSelectedCategory("")}
            sx={{
              my: 1,
              backgroundColor:
                selectedCategory === ""
                  ? theme.palette.primary.dark
                  : theme.palette.primary.main,
            }}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant="contained"
              onClick={() => filterProductsByCategory(category)}
              sx={{
                my: 1,
                backgroundColor:
                  selectedCategory === category
                    ? theme.palette.primary.dark
                    : theme.palette.primary.main,
              }}
            >
              {category}
            </Button>
          ))}
        </Box>
        <Box flexGrow={1}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}
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
      </Box>
    </Box>
  );
}

export default ProductOverview;
