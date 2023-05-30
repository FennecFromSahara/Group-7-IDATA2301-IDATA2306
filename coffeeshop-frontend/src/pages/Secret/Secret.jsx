import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

/**
 * Represents a secret page, used as a placeholder.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function Secret() {
  const theme = useTheme();

  return (
    <div>
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
          <Typography variant="h1">
            Shh... pretend like this is where you're supposed to be.
          </Typography>
        </Box>
      </Box>

      <Footer />
    </div>
  );
}

export default Secret;
