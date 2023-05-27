import React, { useEffect, useState } from "react";
import { Box, Typography, CardMedia, Grid, Button } from "@mui/material";
import { getProductById, getProductsCount } from "../../hooks/apiService";
import imageMap from "../../components/ProductImageMapping";
import { Link } from "react-router-dom";

function ProductDisplay() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const count = await getProductsCount();
      const productIds = getRandomProductIds(count, 3);
      const fetchedProducts = [];

      for (const id of productIds) {
        const product = await getProductById(id);
        fetchedProducts.push(product);
      }

      setProducts(fetchedProducts);
    }

    fetchProducts().catch((err) => {
      console.error(`Error fetching products: ${err.message}`);
    });
  }, []);

  const getRandomProductIds = (count, num) => {
    const ids = new Set();
    while (ids.size < num) {
      ids.add(Math.floor(Math.random() * count) + 1);
    }
    return [...ids];
  };

  const renderProducts = () => {
    if (products.length === 0) {
      return <Typography variant="h1">Loading...</Typography>;
    } else {
      return products.map((product, index) => {
        const isImageOnLeft = index % 2 === 0;
        const image = imageMap[product.image] || imageMap["placeholder"];
        return (
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            {isImageOnLeft && (
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Image of ${product.name}`}
                  style={{
                    maxWidth: "90%",
                    height: "auto",
                    border: "3px solid",
                  }}
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <Box>
                <Typography variant="h2" s>
                  {product.name}
                </Typography>
                <Typography variant="h4" sx={{ fontStyle: "italic", mb: 1 }}>
                  {product.categories
                    .map((category) => category.name)
                    .join(", ")}
                </Typography>
                <Typography variant="body1">{product.description}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/products/${product.id}`}
                  sx={{ mt: 3 }}
                >
                  Go to Product
                </Button>
              </Box>
            </Grid>
            {!isImageOnLeft && (
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Image of ${product.name}`}
                  style={{
                    maxWidth: "90%",
                    height: "auto",
                    border: "3px solid",
                  }}
                />
              </Grid>
            )}
          </Grid>
        );
      });
    }
  };

  return (
    <Box sx={{ m: "3rem" }}>
      <Typography variant="h1">
        Look at some of our amazing products!
      </Typography>
      {renderProducts()}
    </Box>
  );
}

export default ProductDisplay;
