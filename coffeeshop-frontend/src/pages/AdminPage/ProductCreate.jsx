import { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { asyncApiRequest } from "../../tools/requests";
import { useTheme } from "@emotion/react";

const ProductCreate = ({ setCreatingProduct, addProduct }) => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inventoryAmount, setInventoryAmount] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const createProduct = async (event) => {
    event.preventDefault();

    if (!name || !description || !inventoryAmount || !price) {
      alert("All fields are required");
      return;
    }

    try {
      const newProduct = await asyncApiRequest("POST", "/products", {
        name,
        description,
        inventoryAmount: parseInt(inventoryAmount),
        price: parseFloat(price),
        image,
      });

      addProduct(newProduct);
      setCreatingProduct(false);
      window.alert("Product has been created");
    } catch (error) {
      console.error("Error creating product:", error);
    }
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
            Create New Product
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreatingProduct(false)}
          >
            Back
          </Button>
        </Grid>
      </Grid>
      <form onSubmit={createProduct}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            mb: 3,
          }}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            mb: 3,
          }}
          required
        />
        <TextField
          label="Inventory Amount"
          value={inventoryAmount}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setInventoryAmount(e.target.value);
            }
          }}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            mb: 3,
          }}
          required
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => {
            // accept only digits and decimals
            const re = /^[0-9\b]+(\.[0-9\b]+)?$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setPrice(e.target.value);
            }
          }}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            mb: 3,
          }}
          required
        />
        <TextField
          label="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            mb: 3,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginRight: theme.spacing(2) }}
          disabled={!name || !description || !inventoryAmount || !price}
        >
          Create Product
        </Button>
      </form>
    </Box>
  );
};

export default ProductCreate;
