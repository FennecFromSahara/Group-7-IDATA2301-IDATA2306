import { Box, Button, Typography } from "@mui/material";

function HeroSection() {
  return (
    <Box
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
      <Box
        sx={{
          position: "absolute",
          ml: 10,
          mt: 2,
          width: "20%",
          minHeight: "20vh",
          p: "10px",
          border: "1px solid #343a40",
          backgroundColor: "#bfc0d2",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Typography>We sell coffe'n stuff</Typography>
        <Button
          href="/products"
          size="small"
          variant="contained"
          color="primary"
        >
          Shop now
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection;