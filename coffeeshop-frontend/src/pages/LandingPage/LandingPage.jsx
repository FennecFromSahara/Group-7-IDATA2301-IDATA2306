import HeroSection from "./HeroSection";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProductOverview from "../../components/ProductOverview";
import { Box } from "@mui/material";

function LandingPage(props) {
  const user = props.user;

  return (
    <Box>
      <NavBar user={user} />

      <HeroSection />

      <ProductOverview maxIndex={6} user={user} />

      <Footer />
    </Box>
  );
}

export default LandingPage;
