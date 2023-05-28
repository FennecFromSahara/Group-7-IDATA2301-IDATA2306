import React from "react";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../hooks/apiService";
import { useTheme } from "@emotion/react";

/**
 * ProductOverview displays the products in the database
 *
 * @returns {JSX.Element} The rendered React component.
 */
function ProductOverview() {
  const [status, setStatus] = useState("loading");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
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
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const renderProducts = () => {
    if (status === "loaded") {
      return products
        .filter((product) => {
          return (
            (!selectedCategory ||
              product.categories.some(
                (category) => category.name === selectedCategory
              )) &&
            (!searchInput ||
              product.name.toLowerCase().includes(searchInput.toLowerCase()))
          );
        })
        .map((product, index) => (
          <Grid item xs={1} sm={1} md={1} lg={1} key={index}>
            <ProductCard product={product} />
          </Grid>
        ));
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
          ? ": Something went wrong loading the products..."
          : status === "loaded"
          ? `: browse trough our ${products.length} products!`
          : ""}
      </Typography>

      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ minHeight: theme.boxSizes.full, p: "1rem 3rem 3rem 3rem" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{ width: 185, mr: 8, ml: -3 }}
        >
          <TextField
            label="Search for product"
            variant="outlined"
            value={searchInput}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
          />
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
                maxWidth={"1000px"}
              >
                {renderProducts()}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductOverview;
