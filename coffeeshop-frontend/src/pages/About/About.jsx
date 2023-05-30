import { Typography, Box } from "@mui/material";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import TestimonialSection from "./TestimonialSection";
import { useTheme } from "@emotion/react";
import React from "react";

/**
 * Displays an about us page.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function About() {
  const theme = useTheme();

  return (
    <div>
      <NavBar />

      <Box
        display="flex"
        flexDirection="column"
        sx={{
          m: "3rem",
          minHeight: theme.boxSizes.full,
        }}
      >
        <Box flex={1} overflow="auto">
          <Typography variant="h2">About us</Typography>
          <Typography variant="body1" sx={{ mx: 3, my: 3 }}>
            Mocha Nooka Cafe is the place to be for cool cats and urbanites
            alike. Located in the heart of the city, it's the go-to spot for the
            perfect cup of coffee or a tasty bite of food. Whether you're
            grabbing a quick espresso on the go or settling in for a leisurely
            lunch, you'll find the perfect balance of atmosphere and flavor. Our
            baristas are passionate about crafting the perfect cup, with a
            rotating selection of specialty brews, beans, and blends. Plus, our
            friendly staff is always on hand to offer up recommendations for the
            perfect pairing. Come check us out for an unforgettable experience.
          </Typography>
          <br />
          <Typography variant="h2">Our values</Typography>
          <Typography variant="body1" sx={{ mx: 3, my: 3 }}>
            At Mocha Nooka Cafe, we strive to create a peaceful, modern
            atmosphere for our guests to enjoy. Our carefully crafted menu of
            delicious treats and beverages is designed to please all palates.
            Whether you're in the mood for something sweet, savory, or something
            in between, we have something that will tantalize your taste buds.
            Our experienced baristas are passionate about crafting the perfect
            cup, to ensure the most enjoyable coffee experience. And our
            friendly staff will always be around to provide helpful advice and
            recommendations. We believe in creating a calm, modern, and tasty
            space for our guests to enjoy.
          </Typography>
          <br />

          <Typography variant="h2">Hear what our customers say:</Typography>
          <TestimonialSection />
        </Box>
      </Box>

      <Footer />
    </div>
  );
}

export default About;
