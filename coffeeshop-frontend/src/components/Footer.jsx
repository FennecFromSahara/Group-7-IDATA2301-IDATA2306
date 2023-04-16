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
        height: "30vh",
        pt: 3,
        px: 5,
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Typography variant="h1">Contact</Typography>
        </Grid>
        <Grid item xs={2} sm={4} md={4}></Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Typography variant="h1">Disclaimer</Typography>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Typography>Location</Typography>
          <Typography>+47 123 45 678</Typography>
          <Grid container>
            <Grid item xs={2} sm={4} md={1}>
              <Link to="/veryRealURL">
                <TwitterIcon />
              </Link>
            </Grid>
            <Grid item xs={2} sm={4} md={1}>
              <Link to="/veryRealURL">
                <InstagramIcon />
              </Link>
            </Grid>
            <Grid item xs={2} sm={4} md={1}>
              <Link to="/veryRealURL">
                <FacebookIcon />
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Typography>Opening Hours:</Typography>
          <Typography>Monday - Sunday: 8:00 - 24:00</Typography>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Typography>
            This website is a result of a university group project, performed in
            the course{" "}
            <a
              href="https://www.ntnu.edu/studies/courses/IDATA2301#tab=omEmnet"
              rel="noreferrer noopener"
              target="_blank"
            >
              IDATA2301 Web technologies
            </a>
            , at{" "}
            <a
              href="https://www.ntnu.edu/"
              rel="noreferrer noopener"
              target="_blank"
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
