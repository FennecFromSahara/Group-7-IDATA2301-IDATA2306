import React from "react";
import HeroSection from "./HeroSection";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Box } from "@mui/material";
import ProductDisplay from "./ProductDisplay";

function LandingPage() {
  return (
    <Box sx={{}}>
      <NavBar />

      <HeroSection />

      <ProductDisplay />

      <Footer />
    </Box>
  );
}

export default LandingPage;
