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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { asyncApiRequest } from "../../../tools/requests";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.primary,
  fontSize: "1.5rem",
  fontWeight: 600,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary.contrastText,
  },
  "&:hover": {
    backgroundColor: theme.palette.background.hover,
  },
}));

const Categories = ({ categories }) => {
  const theme = useTheme();
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const deleteCategory = async (categoryId) => {
    try {
      await asyncApiRequest("DELETE", `/categories/${categoryId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const addCategory = async (categoryName) => {
    try {
      await asyncApiRequest("POST", "/categories", { name: categoryName });
      setCreatingCategory(false);
      setNewCategoryName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreatingCategory(true)}
        sx={{ mx: 15, mt: 3 }}
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
          <Button onClick={() => addCategory(newCategoryName)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Table
        sx={{
          mx: 15,
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
  );
};

export default Categories;