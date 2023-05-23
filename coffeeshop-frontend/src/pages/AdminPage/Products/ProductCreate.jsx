import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Grid, Chip } from "@mui/material";
import { asyncApiRequest } from "../../../tools/requests";
import { useTheme } from "@emotion/react";
import { getCategories } from "../../../hooks/apiService";

const ProductCreate = ({ setCreatingProduct, addProduct }) => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inventoryAmount, setInventoryAmount] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
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
        categories,
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
            .filter(
              (category) => !categories.split(", ").includes(category.name)
            )
            .map((category) => (
              <Chip
                label={category.name}
                onClick={() => addCategory(category)}
              />
            ))}
        </Typography>

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
