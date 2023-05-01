import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import CardMedia from "@mui/material/CardMedia";
import {
  Box,
  Container,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";

function IndividualProduct(props) {
  const user = props.user;
  const { id } = useParams();
  const { data, error } = useFetch(`http://localhost:8042/api/products/${id}`);
  const [selectedSize, setSelectedSize] = useState("small");

  const theme = useTheme();

  const handleChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const renderProducts = () => {
    if (error) {
      return <Typography variant="h1">Something went wrong...</Typography>;
    } else {
      return (
        <Container
          sx={{
            height: "64vh",
            width: "700px",
            m: "3rem auto",
          }}
        >
          <CardMedia
            component="img"
            image="../img/coffe placeholder.jpg"
            alt="Image of product"
            sx={{ height: 420, width: 327, float: "left" }}
          />
          <Box
            sx={{
              height: 420,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                marginBottom: "1rem",
              }}
            >
              {data.name}
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
              }}
            >
              {data.description}
            </Typography>
            <Select value={selectedSize} onChange={handleChange}>
              <MenuItem value="small">small</MenuItem>
              <MenuItem value="medium">medium</MenuItem>
              <MenuItem value="large">large</MenuItem>
            </Select>
            <Typography
              sx={{
                marginTop: "3rem",
              }}
            >
              {data.price} Kr
            </Typography>
            <Button
              sx={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                width: "130px",
                marginTop: "1rem",
              }}
            >
              buy now
            </Button>
          </Box>
          <Box>
            <Typography variant="h2">Reviews (6)</Typography>
            <Typography>
              <i>*great reviews*</i>
            </Typography>
          </Box>
        </Container>
      );
    }
  };

  return (
    <>
      <NavBar user={user} />

      {renderProducts()}

      <Footer />
    </>
  );
}

export default IndividualProduct;
