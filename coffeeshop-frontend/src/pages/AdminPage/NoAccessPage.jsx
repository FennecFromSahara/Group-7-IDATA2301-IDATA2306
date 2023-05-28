import { Typography, Box } from "@mui/material";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useTheme } from "@emotion/react";
import React from "react";

/**
 * Displays a page telling the user it doesn't have acces to the page.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function NoAccessPage() {
  const theme = useTheme();

  return (
    <>
      <NavBar />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: theme.boxSizes.full }}
      >
        <Typography variant="h2">
          You do not have access to this page
        </Typography>
      </Box>

      <Footer />
    </>
  );
}

export default NoAccessPage;
