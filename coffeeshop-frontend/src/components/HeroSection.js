import { Link } from "@mui/material";

function HeroSection() {
  return (
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
  );
}

export default HeroSection;
