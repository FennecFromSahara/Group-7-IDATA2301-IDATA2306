import { Link } from "@mui/material";
import NavBar from "../components/NavBar";
import "../css/landingPage.css";
import Footer from "./Footer";
import ProductOverview from "./ProductOverview";

function LandingPage() {
  return (
    <div>
      {/* Nav bar */}
      <NavBar />

      <main>
        {/* Hero section */}
        <div
          className="hero-image"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "img/hero-image-full.jpg"
            })`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-64px",
          }}
        >
          <div className="hero-info-box">
            <p>We sell coffe'n stuff</p>
            <Link to="/products">
              <input type="submit" value="View our products" />
            </Link>
          </div>
        </div>

        {/* Product overview */}
        <ProductOverview />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default LandingPage;
