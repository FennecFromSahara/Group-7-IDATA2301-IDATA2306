import React from "react";
import HeroSection from "./HeroSection";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProductDisplay from "./ProductDisplay";

/**
 * Displays the landing page. It contains the NavBar, HeroSection,
 * ProductDisplay and Footer
 *
 * @returns {JSX.Element} The rendered React component.
 */
function LandingPage() {
  return (
    <>
      <NavBar />

      <HeroSection />

      <ProductDisplay />

      <Footer />
    </>
  );
}

export default LandingPage;
