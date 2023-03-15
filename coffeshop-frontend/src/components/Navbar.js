import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Box, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { Link } from "react-router-dom";

const pages = ["Home", "Products", "About Us"];
const link = ["/", "/products", "/about"];

function NavBar() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Link to="/">
          <LocalCafeIcon sx={{ mr: 1, mt: 1 }} />
        </Link>
        <Typography variant="h2" href="/">
          MOCHA NOKA KAFE
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            ml: 3,
          }}
        >
          {pages.map((page, index) => (
            <Button
              key={page}
              sx={{
                my: 2,
                color: "inherit",
                display: "block",
                typography: { fontSize: 16 },
              }}
            >
              <Link to={link[index]} style={{ textDecoration: "none" }}>
                {page}
              </Link>
            </Button>
          ))}
        </Box>

        <IconButton sx={{ mr: 2 }}>
          <Link to="/shoppingCart">
            <ShoppingCartIcon />
          </Link>
        </IconButton>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            color="inherit"
            variant="contained"
            sx={{ typography: { fontSize: 16, fontWeight: 700 } }}
          >
            Login
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
