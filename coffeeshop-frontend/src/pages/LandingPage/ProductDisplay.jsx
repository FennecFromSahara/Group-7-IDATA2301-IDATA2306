import React, { useEffect, useState } from "react";
import { Box, Typography, CardMedia, Grid, Button } from "@mui/material";
import { getProductById, getProductIds } from "../../hooks/apiService";
import { imageMap } from "../../components/ProductImageMapping";
import { Link } from "react-router-dom";

/**
 * Displays 3 randomly products chosen from the inventory.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function ProductDisplay() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productIds = await getProductIds();
      const randomProductIds = getRandomProductIds(productIds, 3);
      const fetchedProducts = [];

      for (const id of randomProductIds) {
        const product = await getProductById(id);
        fetchedProducts.push(product);
      }

      setProducts(fetchedProducts);
    }

    fetchProducts().catch((err) => {
      console.error(`Error fetching products: ${err.message}`);
    });
  }, []);

  const getRandomProductIds = (ids, num) => {
    const randomIds = [];
    while (randomIds.length < num && ids.length > 0) {
      const randomIndex = Math.floor(Math.random() * ids.length);
      randomIds.push(ids[randomIndex]);
      ids.splice(randomIndex, 1);
    }
    return randomIds;
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
            component="article"
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
            key={product.id}
          >
            {isImageOnLeft && (
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Image of ${product.name}`}
                  style={{
                    width: "80%",
                    height: "80%",
                    border: "3px solid",
                  }}
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <Box>
                <Typography variant="h2">{product.name}</Typography>
                <Typography variant="body1" sx={{ fontStyle: "italic", mb: 1 }}>
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
                    width: "80%",
                    height: "80%",
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
    <Box component="section" sx={{ m: "1rem" }}>
      <Typography variant="h1">
        Look at some of our amazing products!
      </Typography>
      {renderProducts()}
    </Box>
  );
}

export default ProductDisplay;
