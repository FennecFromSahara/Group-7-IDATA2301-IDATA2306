import { useState, useEffect } from "react";
import { asyncApiRequest } from "../../../tools/requests";
import { useTheme } from "@emotion/react";
import { TextField, Button, Box, Grid, Typography, Chip } from "@mui/material";
import { getCategories } from "../../../hooks/apiService";
import React from "react";

const ProductOverview = ({
  product,
  setProduct,
  updateProducts,
  removeProduct,
}) => {
  const theme = useTheme();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [inventoryAmount, setInventoryAmount] = useState(
    product.inventoryAmount
  );
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [categories, setCategories] = useState(
    product.categories
      ? product.categories.map((category) => category.name).join(", ")
      : ""
  );
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await getCategories();
      setAllCategories(categories);
    };

    loadCategories();
  }, []);

  const addCategory = (category) => {
    setCategories((prevState) =>
      prevState ? prevState + ", " + category.name : category.name
    );
  };

  const removeCategory = (categoryToRemove) => {
    setCategories((prevState) =>
      prevState
        .split(", ")
        .filter((category) => category !== categoryToRemove.name)
        .join(", ")
    );
  };

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
          categories,
          image,
        }
      );
      setProduct(updatedProduct);
      updateProducts(updatedProduct);
      window.alert("Product has been updated");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      try {
        await asyncApiRequest("DELETE", `/products/${product.id}`);
        setProduct(null);
        removeProduct(product.id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const backToProducts = () => {
    setProduct(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: 2,
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
      <Typography variant="body1" gutterBottom>
        Categories:
        {categories.split(", ").map((category) => (
          <Chip
            label={category}
            onDelete={() => removeCategory({ name: category })}
          />
        ))}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Available Categories:
        {allCategories
          .filter((category) => !categories.split(", ").includes(category.name))
          .map((category) => (
            <Chip label={category.name} onClick={() => addCategory(category)} />
          ))}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={updateProduct}
        style={{ marginRight: 2 }}
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
