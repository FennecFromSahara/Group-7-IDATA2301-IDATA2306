import { Button } from "@mui/material";

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
        height: "92vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="hero-info-box">
        <p>We sell coffe'n stuff</p>
        <Button
          href="/products"
          size="small"
          variant="contained"
          color="primary"
        >
          Shop now
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
