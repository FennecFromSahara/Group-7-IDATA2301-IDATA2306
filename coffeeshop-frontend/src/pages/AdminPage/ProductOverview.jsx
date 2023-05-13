import { useState } from "react";
import { asyncApiRequest } from "../../tools/requests";
import { useTheme } from "@emotion/react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";

const ProductOverview = ({ product, setProduct }) => {
  const theme = useTheme();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [inventoryAmount, setInventoryAmount] = useState(
    product.inventoryAmount
  );
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  // TODO: update table in Products.jsx
  const updateProduct = async () => {
    try {
      const updatedProduct = await asyncApiRequest(
        "PUT",
        `/products/${product.id}`,
        {
          name,
          description,
          inventoryAmount,
          price,
          image,
        }
      );
      setProduct(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // TODO: Successfully delets product, still gives error.
  const deleteProduct = async () => {
    try {
      await asyncApiRequest("DELETE", `/products/${product.id}`);
      setProduct(null); // Clear the selected product
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const backToProducts = () => {
    setProduct(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        borderRadius: 2,
        border: `2px solid ${theme.palette.primary.light}`,
        m: 3,
      }}
    >
      <Grid container>
        <Grid item xs>
          <Typography variant="h1" gutterBottom>
            Product Overview: {name}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={backToProducts}>
            Back
          </Button>
        </Grid>
      </Grid>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
      />
      <TextField
        label="Inventory Amount"
        value={inventoryAmount}
        onChange={(e) => setInventoryAmount(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
      />
      <TextField
        label="Image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={updateProduct}
        style={{ marginRight: theme.spacing(2) }}
      >
        Update Product
      </Button>
      <Button variant="contained" color="danger" onClick={deleteProduct}>
        Delete Product
      </Button>
    </Box>
  );
};

export default ProductOverview;
