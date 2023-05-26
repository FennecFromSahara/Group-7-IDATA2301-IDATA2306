import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CardMedia,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { getProductById } from "../../hooks/apiService";
import React from "react";
import imageMap from "../../components/ProductImageMapping";

function IndividualProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("small");
  const [showReviews, setShowReviews] = useState(false);
  const [image, setImage] = useState("");
  const theme = useTheme();

  useEffect(() => {
    getProductById(id)
      .then((productData) => {
        setProduct(productData);
        setImage(imageMap[productData.image]);
      })
      .catch((err) => {
        console.error(`Error fetching product: ${err.message}`);
      });
  }, [id]);

  const handleChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleShowReviews = () => {
    setShowReviews(!showReviews);
  };

  const placeholderReviews = [
    { id: 1, content: "Great product! Highly recommended." },
    { id: 2, content: "Pretty decent, could be better." },
    { id: 3, content: "Amazing! Will buy again." },
  ];

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
            minHeight: theme.boxSizes.navSectionFooter,
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
              sx={{ height: 420, width: 420, float: "left" }}
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
                <Select value={selectedSize} onChange={handleChange}>
                  <MenuItem value="small">small</MenuItem>
                  <MenuItem value="medium">medium</MenuItem>
                  <MenuItem value="large">large</MenuItem>
                </Select>
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "160px" }}
              >
                Add to cart
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 4,
              alignItems: "center",
              justifyContent: "center",
              width: "65vw",
              minHeight: "15rem",
            }}
          >
            <Typography variant="h4">
              Reviews ({placeholderReviews.length})
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleShowReviews}
            >
              Show reviews
            </Button>
            {showReviews &&
              placeholderReviews.map((review) => (
                <Typography variant="body1" key={review.id} sx={{ mt: 2 }}>
                  {review.content}
                </Typography>
              ))}
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
