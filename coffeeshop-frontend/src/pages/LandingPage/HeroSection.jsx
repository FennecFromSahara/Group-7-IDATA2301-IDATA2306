import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";

import heroImage1440 from "../../assets/img/landingPage/hero-image-1440.webp";
import heroImage1080 from "../../assets/img/landingPage/hero-image-1080.webp";

/**
 * Displays the hero section of the landingpage, contains a background image
 * and a short description of the website, and a button to the products page.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function HeroSection() {
  const theme = useTheme();

  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const getBackgroundImage = () => {
      return window.innerWidth <= theme.breakpoints.values.md
        ? `url(${heroImage1080})`
        : `url(${heroImage1440})`;
    };

    setBackgroundImage(getBackgroundImage());

    const handleResize = () => {
      setBackgroundImage(getBackgroundImage());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  const backgroundStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage,
    height: theme.boxSizes.full,
    width: "100%",
  };

  return (
    <Box component="section" sx={backgroundStyles}>
      <Box
        sx={{
          position: "absolute",
          left: "10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: { xs: "80%", sm: "60%", md: "20%" },
          minHeight: "10rem",
          p: 1,
          backgroundColor: theme.palette.tertiary.main,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Typography>
          The go-to spot for the perfect cup of coffee or a tasty bite of food,
          for cool cats and urbanites alike.
        </Typography>
        <Button
          href="/products"
          size="small"
          variant="contained"
          color="primary"
        >
          Shop now
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection;
