import { Link } from "@mui/material";
import NavBar from "../components/NavBar";
import "../css/landingPage.css";
import ProductOverview from "./ProductOverview";

function LandingPage() {
  return (
    <div>
      {/* Nav bar */}
      <NavBar />

      <main>
        {/* Hero section */}
        <div className="hero-image">
          <div className="hero-info-box">
            <p>We sell coffe'n stuff</p>
            <Link to="/products">
              <input type="submit" value="View our products" />
            </Link>
          </div>
        </div>

        <ProductOverview />

        {/* Footer */}
        <div className="landing-footer">
          <h1>Contact</h1>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
