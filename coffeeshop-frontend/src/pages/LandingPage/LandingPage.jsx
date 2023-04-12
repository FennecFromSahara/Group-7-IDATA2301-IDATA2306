import HeroSection from "./HeroSection";
import NavBar from "../../components/NavBar";
import "./landingPage.css";
import Footer from "../../components/Footer";
import ProductOverview from "../../components/ProductOverview";

/**
 *
 * @returns
 */
function LandingPage() {
  return (
    <div>
      <NavBar />

      <main>
        <HeroSection />

        <ProductOverview />

        <Footer />
      </main>
    </div>
  );
}

export default LandingPage;
