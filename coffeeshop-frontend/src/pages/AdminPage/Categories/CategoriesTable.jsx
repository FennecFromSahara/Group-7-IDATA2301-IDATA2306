import { useTheme } from "@emotion/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../Components/StyledTable";
import { useState } from "react";
import { asyncApiRequest } from "../../../tools/requests";
import React from "react";
import Alert from "../../../components/Alert";

/**
 * Displays a table of categories products can be in, and functionality
 * to add and delte categories.
 *
 * @returns {JSX.Element} The rendered React component.
 */
const CategoriesTable = ({ categories: initialCategories }) => {
  const theme = useTheme();
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState(initialCategories);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const deleteCategory = async (categoryId) => {
    try {
      await asyncApiRequest("DELETE", `/categories/${categoryId}`);
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );

      setAlertState("success");
      setAlertMessage("Category has been deleted");
      setAlertOpen(true);
    } catch (err) {
      console.error(err);
      setAlertState("error");
      setAlertMessage("Error deleting order");
      setAlertOpen(true);
    }
  };

  const addCategory = async (categoryName) => {
    try {
      const newCategory = await asyncApiRequest("POST", "/categories", {
        name: categoryName,
      });
      setCreatingCategory(false);
      setNewCategoryName("");
      setCategories([...categories, newCategory]);

      setAlertState("success");
      setAlertMessage("Category has been added");
      setAlertOpen(true);
    } catch (err) {
      console.error(err);
      setAlertState("error");
      setAlertMessage("Error adding category");
      setAlertOpen(true);
    }
  };

  React.useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

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
      <TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreatingCategory(true)}
          sx={{ mx: 3, mt: 3 }}
        >
          Add Category
        </Button>

        <Dialog
          open={creatingCategory}
          onClose={() => setCreatingCategory(false)}
        >
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreatingCategory(false)}>Cancel</Button>
            <Button
              onClick={() => addCategory(newCategoryName)}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Table
          sx={{
            mx: 3,
            my: 3,
            maxWidth: "1000px",
            backgroundColor: theme.palette.background.paper,
            border: `3px solid ${theme.palette.primary.light}`,
          }}
          aria-label="category table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <StyledTableRow key={category.id}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  {category.name}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="danger"
                    onClick={() => deleteCategory(category.id)}
                    sx={{ ml: 3, mt: 3 }}
                  >
                    Remove category{"-"}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.danger.contrastText,
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoriesTable;
