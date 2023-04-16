import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Box, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";

const pages = ["Home", "Products", "About Us"];
const link = ["/", "/products", "/about"];

/**
 * A responsive nav bar that includes a menu button for smaller resolutions.
 *
 * @returns {JSX.Element} The JSX code for a nav bar for the coffeeshop
 */
function NavBar() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{ height: "8vh" }}>
      <Toolbar>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MenuIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {pages.map((page, index) => (
                      <MenuItem>
                        <Link
                          to={link[index]}
                          style={{ textDecoration: "none" }}
                        >
                          {page}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
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
