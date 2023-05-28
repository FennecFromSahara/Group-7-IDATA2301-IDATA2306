import React from "react";
import { Box, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useTheme } from "@emotion/react";

export default function NotFoundPage() {
  const theme = useTheme();

  return (
    <div>
      <NavBar />

      <Box
        display="flex"
        flexDirection="column"
        minHeight={theme.boxSizes.navSectionFooter}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          Box
          flex={1}
          overflow="auto"
        >
          <Typography variant="h1">404: Page not found</Typography>
        </Box>
      </Box>

      <Footer />
    </div>
  );
}
