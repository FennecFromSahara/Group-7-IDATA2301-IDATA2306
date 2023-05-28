import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { asyncApiRequest } from "../../../tools/requests";
import { useTheme } from "@emotion/react";
import { getCategories } from "../../../hooks/apiService";
import React from "react";
import imageMap from "../../../components/ProductImageMapping";
import Alert from "../../../components/Alert";

/**
 * Displays a create product page, with functionality to add a product to
 * the database.
 *
 * @returns {JSX.Element} The rendered React component.
 */
const ProductCreate = ({ setCreatingProduct, addProduct }) => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inventoryAmount, setInventoryAmount] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("placeholder");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const changeImage = (img) => {
    setImage(img);
    setOpenDialog(false);
  };

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await getCategories();
      setAllCategories(categories);
    };

    loadCategories();
  }, []);

  const addCategory = (category) => {
    setSelectedCategories((prevState) => [...prevState, category]);
  };

  const removeCategory = (categoryToRemove) => {
    setSelectedCategories((prevState) =>
      prevState.filter((category) => category.id !== categoryToRemove.id)
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
        categories: selectedCategories,
        image,
      });

      addProduct(newProduct);
      setCreatingProduct(false);

      setAlertState("success");
      setAlertMessage("Product has been created");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error creating product:", error);
      setAlertState("error");
      setAlertMessage("Error creating product");
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertState}
          alertState={alertState}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
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
          <Box sx={{ cursor: "pointer" }} onClick={handleClickOpen}>
            <img
              src={imageMap[image]}
              alt={name}
              style={{ width: "200px", height: "200px" }}
            />
            <Typography variant="body2" sx={{ fontStyle: "italic", mb: 2 }}>
              Click the image to change image
            </Typography>
          </Box>
          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>Select a new image</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {Object.keys(imageMap)
                  .filter((img) => img !== image)
                  .map((img, index) => (
                    <Grid item key={index} onClick={() => changeImage(img)}>
                      <img
                        src={imageMap[img]}
                        alt={img}
                        style={{
                          width: "120px",
                          height: "120px",
                          cursor: "pointer",
                        }}
                      />
                    </Grid>
                  ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <Box component="div" variant="body1" gutterBottom>
            Categories:
            {selectedCategories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                onDelete={() => removeCategory(category)}
              />
            ))}
          </Box>

          <Box component="div" variant="body1" gutterBottom>
            Available Categories:
            {allCategories
              .filter(
                (category) =>
                  !selectedCategories.find(
                    (selected) => selected.id === category.id
                  )
              )
              .map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  onClick={() => addCategory(category)}
                />
              ))}
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mr: 2, mt: 2 }}
            disabled={!name || !description || !inventoryAmount || !price}
          >
            Create Product
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ProductCreate;
