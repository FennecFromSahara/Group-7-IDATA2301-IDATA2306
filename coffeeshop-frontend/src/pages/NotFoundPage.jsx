import React from "react";
import { Box, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useTheme } from "@emotion/react";

/**
 * Represents the 404 Not Found Page.
 *
 * @returns {JSX.Element} The rendered React component.
 */
export default function NotFoundPage() {
  const theme = useTheme();

  return (
    <>
      <NavBar />

      <Box
        display="flex"
        flexDirection="column"
        minHeight={theme.boxSizes.full}
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
    </>
  );
}
