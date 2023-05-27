import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CardMedia,
  MenuItem,
  Select,
  Typography,
  Rating,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { getProductById } from "../../hooks/apiService";
import React from "react";
import imageMap from "../../components/ProductImageMapping";
import { addToCart } from "../../tools/addToCart";
import { useAuth } from "../../hooks/useAuth";
import ReviewForm from "./ReviewForm";

function IndividualProduct() {
  const theme = useTheme();

  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [image, setImage] = useState("");
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((productData) => {
        setProduct(productData);
        setImage(imageMap[productData.image]);
        if (productData.productSizes && productData.productSizes.length > 0) {
          setSelectedSize(productData.productSizes[0].size);
        }
        // Check if user has already reviewed the product
        const userReview = productData.reviews.find(
          (review) => review.username === user?.username
        );
        if (userReview) {
          setUserHasReviewed(true);
        }
      })
      .catch((err) => {
        console.error(`Error fetching product: ${err.message}`);
      });
  }, [id, user]);

  const handleChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleShowReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleShowReviewForm = () => {
    setShowReviewForm(true);
  };

  const renderProduct = () => {
    if (!product) {
      return <Typography variant="h1">Loading...</Typography>;
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: theme.boxSizes.full3rem,
            m: "3rem auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={image}
              alt="Image of product"
              sx={{
                height: 420,
                width: 420,
                float: "left",
                border: "3px solid",
              }}
            />
            <Box
              sx={{
                marginLeft: 2,
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h2">{product.name}</Typography>
                <Typography variant="h4" sx={{ fontStyle: "italic" }}>
                  {product.categories
                    .map((category) => category.name)
                    .join(", ")}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  {product.description}
                </Typography>
                {product.productSizes && product.productSizes.length > 0 && (
                  <Select value={selectedSize} onChange={handleChange}>
                    {product.productSizes.map((size, index) => (
                      <MenuItem key={index} value={size.size}>
                        {size.size} - {size.weight}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "160px" }}
                onClick={() => addToCart(user, product)}
              >
                Add to cart
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 4,
              alignItems: "start",
              justifyContent: "space-between",
              flexDirection: "column",
              display: "flex",
              width: "65vw",
              minHeight: "15rem",
            }}
          >
            <Box>
              <Typography variant="h3">
                Reviews ({product?.reviews?.length || 0})
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 1 }}
                onClick={handleShowReviews}
              >
                Show
              </Button>
              {showReviews &&
                (product?.reviews?.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <Box key={index} sx={{ mt: 2 }}>
                      <Typography sx={{ fontSize: 16 }}>
                        {review.username}:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                          size="small"
                        />
                        <Typography sx={{ fontSize: 16, marginLeft: 1 }}>
                          {review.reviewText}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    This product has no reviews
                  </Typography>
                ))}
            </Box>
            {showReviews && user && !userHasReviewed && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                size="small"
                onClick={handleShowReviewForm}
              >
                Write a review
              </Button>
            )}
            {showReviewForm && (
              <ReviewForm
                open={showReviewForm}
                handleClose={() => setShowReviewForm(false)}
                handleSubmit={(newReview) => {
                  setProduct((prevProduct) => {
                    return {
                      ...prevProduct,
                      reviews: [...prevProduct.reviews, newReview],
                    };
                  });
                  setShowReviewForm(false);
                  setUserHasReviewed(true);
                }}
                productId={product.id}
              />
            )}
          </Box>
        </Box>
      );
    }
  };

  return (
    <>
      <NavBar />

      {renderProduct()}

      <Footer />
    </>
  );
}

export default IndividualProduct;
