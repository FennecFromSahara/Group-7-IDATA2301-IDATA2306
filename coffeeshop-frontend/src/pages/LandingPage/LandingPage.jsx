import HeroSection from "./HeroSection";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProductOverview from "../../components/ProductOverview";
import { Box } from "@mui/material";

function LandingPage() {
  return (
    <Box>
      <NavBar />

      <HeroSection />

      <ProductOverview maxIndex={6} />

      <Footer />
    </Box>
  );
}

export default LandingPage;
