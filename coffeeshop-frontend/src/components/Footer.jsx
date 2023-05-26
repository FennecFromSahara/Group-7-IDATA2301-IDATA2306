import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Grid, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";

function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 3,
        px: 5,
        backgroundColor: theme.palette.secondary.main,
        minHeight: "18vh",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 8, sm: 8, md: 12 }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h1">Contact</Typography>
          <Typography>123 ELF ROAD, NORTH POLE 88888</Typography>
          <Typography>+47 123 45 678</Typography>
          <Grid container>
            <Grid item>
              <Box mr={2}>
                <Link to="/veryRealURL">
                  <TwitterIcon />
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Box mr={2}>
                <Link to="/veryRealURL">
                  <InstagramIcon />
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Link to="/veryRealURL">
                <FacebookIcon />
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography variant="h1">Opening Hours:</Typography>
          <Typography>Monday - Sunday: 8:00 - 24:00</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h1">Disclaimer</Typography>
          <Typography>
            This website is a result of a university group project, performed in
            the course{" "}
            <a
              href="https://www.ntnu.edu/studies/courses/IDATA2301#tab=omEmnet"
              rel="noreferrer noopener"
              target="_blank"
              style={{ color: theme.palette.info.main }}
            >
              IDATA2301 Web technologies
            </a>
            , at{" "}
            <a
              href="https://www.ntnu.edu/"
              rel="noreferrer noopener"
              target="_blank"
              style={{ color: theme.palette.info.main }}
            >
              NTNU
            </a>
            . All the information provided here is a result of imagination. Any
            resemblance with real companies or products is a coincidence.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
