import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendAuthenticationRequest } from "../../tools/authentication";
import { Alert } from "@mui/material";

/**
 * Code adapted from
 * https://github.com/mui/material-ui/blob/v5.11.16/docs/data/material/getting-started/templates/sign-in/SignIn.js
 *
 * @returns
 */
export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submitForm(event) {
    event.preventDefault(); // Prevent default form submission
    console.log("Submitting form");
    sendAuthenticationRequest(
      username,
      password,
      onLoginSuccess,
      (errorMessage) => setError(errorMessage)
    );
  }

  /**
   * This function is called when login is successful
   */
  function onLoginSuccess(userData) {
    console.log("onLoginSuccess called with userData:", userData);
    props.setUser(userData);
    navigate("/");
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <Alert severity="error">{error}</Alert>;
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleUsernameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {errorMessage}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/createUser" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
