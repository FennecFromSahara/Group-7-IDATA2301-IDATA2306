import ProductCard from "./ProductCard";
import { useFetch } from "../hooks/useFetch";
import { Box, Typography } from "@mui/material";

function ProductOverview() {
  const { data, error } = useFetch("http://localhost:8042/api/products");

  const renderProducts = () => {
    if (error) {
      console.log(error);

      return <Typography>Something went wrong...</Typography>;
    } else if (data.length > 0) {
      return (
        <>
          {data.map((product) => (
            <Box
              sx={{
                m: "1rem 1rem 0 1rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <ProductCard product={product} key={product.id} />
            </Box>
          ))}
        </>
      );
    } else {
      return <Typography>Loading...</Typography>;
    }
  };

  return (
    <Box
      className="landing-product-overview"
      sx={{
        minHeight: "100vh",
        p: "1rem 3rem 3rem 3rem",
      }}
    >
      <Typography variant="h1">Products</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          justifyContent: "center",
          m: "0 1rem 1rem 1rem",
        }}
      >
        {renderProducts()}
      </Box>
    </Box>
  );
}

export default ProductOverview;
