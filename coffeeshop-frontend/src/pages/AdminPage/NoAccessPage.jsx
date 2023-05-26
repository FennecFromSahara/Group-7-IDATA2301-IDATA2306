import { Typography, Box } from "@mui/material";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useTheme } from "@emotion/react";
import React from "react";

function NoAccessPage() {
  const theme = useTheme();

  return (
    <div>
      <NavBar />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: theme.boxSizes.navSection }}
      >
        <Typography variant="h2">
          You do not have access to this page
        </Typography>
      </Box>

      <Footer />
    </div>
  );
}

export default NoAccessPage;
