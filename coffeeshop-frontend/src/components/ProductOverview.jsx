import ProductCard from "./ProductCard";
import { useFetch } from "../hooks/useFetch";
import { Box, Grid, Typography } from "@mui/material";

/**
 * Productoverview displays a cusom number of ProductCard Objects in a grid.
 *
 * @returns {JSX.Element} A grid of ProductCard objects.
 */
function ProductOverview(props) {
  const { data, error } = useFetch("http://localhost:8042/api/products");

  const renderProducts = () => {
    if (error) {
      console.log(error);

      return <Typography>Something went wrong...</Typography>;
    } else if (data.length > 0) {
      return (
        <>
          {data.map((product, index) => {
            if (index < props.maxIndex) {
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
    } else {
      return <Typography>Loading...</Typography>;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: "1rem 3rem 3rem 3rem",
      }}
    >
      <Typography variant="h1">Products</Typography>
      <Box
        className="landing-product-overview"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
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
            sx={{ width: "25%" }}
          >
            {renderProducts()}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductOverview;
