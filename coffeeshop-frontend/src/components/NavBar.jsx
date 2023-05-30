import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { isAdmin } from "../tools/authentication";
import { useAuth } from "../hooks/useAuth";
import { useMediaQuery } from "@mui/material";
import handleLogout from "../tools/handleLogout";
import { useTheme } from "@emotion/react";

const pages = ["Home", "Products", "About Us"];
const link = ["/", "/products", "/about"];

/**
 * Displays a responsive nav bar.
 *
 * @returns {JSX.Element} The JSX code for a nav bar for the coffeeshop
 */
function NavBar() {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const anchorRef = React.useRef(null);
  const matches = useMediaQuery("(max-width:1185px)");

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

  if (user) {
    if (isAdmin(user) && !pages.includes("Admin")) {
      pages.push("Admin");
      link.push("/admin");
    }
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ minHeight: "3rem", width: "100%" }}
    >
      <Toolbar>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{
            ml: -3,
          }}
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
                      <MenuItem key={index}>
                        <Link
                          to={link[index]}
                          style={{ textDecoration: "none" }}
                        >
                          {page}
                        </Link>
                      </MenuItem>
                    ))}
                    {user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Typography variant="h2">
          {matches ? "MNC |" : "MOCHA NOOKA CAFE |"}
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
                display: "block",
                typography: {
                  fontSize: 20,
                  fontWeight: 700,
                  border: `2px solid ${theme.palette.primary.main}`,
                  ":hover": {
                    border: `2px solid ${theme.palette.text.primary}`,
                  },
                },
              }}
            >
              <Link to={link[index]} style={{ textDecoration: "none" }}>
                {page}
              </Link>
            </Button>
          ))}
        </Box>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          <Button
            sx={{
              mr: 2,
              typography: {
                border: `2px solid ${theme.palette.primary.main}`,
                ":hover": {
                  border: `2px solid ${theme.palette.text.primary}`,
                },
              },
            }}
          >
            <Link to="/shoppingCart" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  typography: { fontSize: 18 },
                  p: "2px",
                }}
              >
                <ShoppingCartIcon />
                <Typography>Cart</Typography>
              </Box>
            </Link>
          </Button>
          {user ? (
            <Button
              sx={{
                typography: {
                  border: `2px solid ${theme.palette.primary.main}`,
                  ":hover": {
                    border: `2px solid ${theme.palette.text.primary}`,
                  },
                },
              }}
            >
              <Link
                to={`/u/${user.username}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    typography: { fontSize: 18 },
                    p: "2px",
                  }}
                >
                  <AccountCircleIcon />
                  <Typography>Profile</Typography>
                </Box>
              </Link>
            </Button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                color="inherit"
                variant="contained"
                sx={{ typography: { fontSize: 16, fontWeight: 700 } }}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
