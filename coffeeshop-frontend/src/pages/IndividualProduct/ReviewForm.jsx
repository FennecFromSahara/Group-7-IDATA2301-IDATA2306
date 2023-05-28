import React, { useState } from "react";
import {
  TextField,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { asyncApiRequest } from "../../tools/requests";
import { useAuth } from "../../hooks/useAuth";

/**
 * Represents the dialog where a user gives a review to a product.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function ReviewForm({ open, handleClose, handleSubmit, productId }) {
  const { user } = useAuth();
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(1);

  const handleReviewChange = (event) => {
    setNewReviewText(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setNewReviewRating(newValue);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const reviewDto = {
      reviewText: newReviewText,
      rating: newReviewRating,
      username: user.username,
    };
    try {
      await asyncApiRequest(
        "POST",
        `/products/${productId}/add-review`,
        reviewDto
      );
      handleSubmit(reviewDto);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Write a Review</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="review"
          label="Review"
          name="review"
          autoComplete="review"
          value={newReviewText}
          onChange={handleReviewChange}
          sx={{ mb: 2 }}
        />
        <Rating
          name="simple-controlled"
          value={newReviewRating}
          onChange={handleRatingChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleReviewSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReviewForm;
