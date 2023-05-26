import React from "react";
import HeroSection from "./HeroSection";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProductOverview from "../Products/ProductOverview";
import { Box } from "@mui/material";

function LandingPage() {
  return (
    <Box sx={{}}>
      <NavBar />

      <HeroSection />

      <ProductOverview />

      <Footer />
    </Box>
  );
}

export default LandingPage;
