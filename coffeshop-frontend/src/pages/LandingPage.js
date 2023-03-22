import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
import "../css/landingPage.css";
import Footer from "./Footer";
import ProductOverview from "../components/ProductOverview";

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
