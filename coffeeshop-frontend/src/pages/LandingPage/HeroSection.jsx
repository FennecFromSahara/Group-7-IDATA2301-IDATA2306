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
        height: "94vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          ml: { xs: "10%", sm: "25%", md: 35 },
          mt: { xs: "10%", sm: "15%", md: 25 },
          width: { xs: "80%", sm: "60%", md: "20%" },
          minHeight: "10rem",
          minWidth: "25rem",
          p: 1,
          backgroundColor: "#bfc0d2",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Typography>
          The go-to spot for the perfect cup of coffee or a tasty bite of food,
          for cool cats and urbanites alike.
        </Typography>
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
