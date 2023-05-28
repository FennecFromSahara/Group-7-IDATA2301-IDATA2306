import { useState, useEffect } from "react";
import { asyncApiRequest } from "../../../tools/requests";
import { useTheme } from "@emotion/react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { getCategories } from "../../../hooks/apiService";
import React from "react";
import {
  imageMap,
  iconImageMap,
} from "../../../components/ProductImageMapping";
import Alert from "../../../components/Alert";

/**
 * Displays an order in the database and functionality to edit and delete it.
 *
 * @returns {JSX.Element} The rendered React component.
 */
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
  const [categories, setCategories] = useState(product.categories || []);
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

  const updateImage = async (image) => {
    try {
      const updatedProduct = await asyncApiRequest(
        "PATCH",
        `/products/${product.id}/image`,
        {
          image,
        }
      );
      setImage(image);
      setOpenDialog(false);

      setProduct(updatedProduct);
      updateProducts(updatedProduct);

      setAlertState("success");
      setAlertMessage("Image has been updated");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error updating image:", error);
      setAlertState("error");
      setAlertMessage("Error updating image");
      setAlertOpen(true);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await getCategories();
      setAllCategories(categories);
    };

    loadCategories();
  }, []);

  const addCategory = (category) => {
    setCategories((prevState) => [...prevState, category]);
  };

  const removeCategory = (categoryToRemove) => {
    setCategories((prevState) =>
      prevState.filter((category) => category.id !== categoryToRemove.id)
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
          categories: categories.map((category) => ({
            id: category.id,
            name: category.name,
          })),
          image,
        }
      );
      setProduct(updatedProduct);
      updateProducts(updatedProduct);

      setAlertState("success");
      setAlertMessage("Product has been updated");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error updating product:", error);
      setAlertState("error");
      setAlertMessage("Error updating product");
      setAlertOpen(true);
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
            <Button
              variant="contained"
              color="primary"
              onClick={backToProducts}
            >
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
              {Object.keys(iconImageMap)
                .filter((img) => img !== image)
                .map((img, index) => (
                  <Grid item key={index} onClick={() => updateImage(img)}>
                    <img
                      src={iconImageMap[img]}
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
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="body1" gutterBottom component="div">
          Categories:
          {categories.map((categoryObj, index) => {
            const category = allCategories.find(
              (category) => category.name === categoryObj.name
            );
            return (
              <Chip
                key={index}
                label={categoryObj.name}
                onDelete={() => removeCategory(category)}
              />
            );
          })}
        </Typography>

        <Typography variant="body1" gutterBottom component="div">
          Available Categories:
          {allCategories
            .filter(
              (category) =>
                !categories.map((c) => c.name).includes(category.name)
            )
            .map((category, index) => (
              <Chip
                key={index}
                label={category.name}
                onClick={() => addCategory(category)}
              />
            ))}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={updateProduct}
          sx={{ mr: 2, mt: 2 }}
        >
          Update Product
        </Button>
        <Button
          variant="contained"
          color="danger"
          onClick={deleteProduct}
          sx={{ mr: 2, mt: 2 }}
        >
          Delete Product
        </Button>
      </Box>
    </>
  );
};

export default ProductOverview;
