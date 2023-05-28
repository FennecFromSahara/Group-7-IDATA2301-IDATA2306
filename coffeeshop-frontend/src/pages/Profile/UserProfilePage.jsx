import { useParams, useNavigate } from "react-router-dom";
import { getProfileData } from "../../hooks/apiService";
import { useAuth } from "../../hooks/useAuth";
import { isAdmin } from "../../tools/authentication";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useTheme } from "@emotion/react";
import handleLogout from "../../tools/handleLogout";
import ErrorPage from "../../components/ErrorPage";
import React from "react";
import { asyncApiRequest } from "../../tools/requests";
import Alert from "../../components/Alert";

/**
 * Represents the profile page for a user.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function UserProfilePage() {
  const { user, loading } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [profile, setProfile] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);

  const [error, setError] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [open, setOpen] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setProfileLoading(true);
        const profileData = await getProfileData(username);
        setProfile(profileData);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  // Redirect if not the user or an admin
  useEffect(() => {
    if (
      !profileLoading &&
      (!user || (user.username !== profile?.username && !isAdmin(user)))
    ) {
      navigate("/access_denied");
    }
  }, [user, profile, navigate, profileLoading]);

  const handleChangePassword = async () => {
    try {
      if (currentPassword === newPassword) {
        setAlertState("error");
        setAlertMessage("Current password and new password cannot be the same");
        setAlertOpen(true);
        return;
      }

      const response = await asyncApiRequest(
        "PATCH",
        "/change_password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        true
      );
      setAlertState("success");
      setAlertMessage(response);
      setAlertOpen(true);

      setOpen(false);
    } catch (error) {
      setAlertState("error");
      setAlertMessage(error.message);
      setAlertOpen(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading || profileLoading) {
    return (
      <div>
        <NavBar />
        <Box
          minHeight={theme.boxSizes.full}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">
            Checking if you're supposed to be here...
          </Typography>
        </Box>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <ErrorPage error={error} />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: "8vh" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertState}
          cartState={alertState}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box
        style={{
          minHeight: theme.boxSizes.navSectionFooter,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            minWidth: "350px",
          }}
        >
          <Grid container>
            <Grid item>
              <Typography variant="h1" component="div">
                {profile.username}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontStyle: "italic", pb: 3 }}
              >
                Member Since:{" "}
                {profile && profile.createdAt
                  ? profile.createdAt.split(" ")[0]
                  : "Loading..."}
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={2} sx={{ width: "200px" }}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {profile.firstName} {profile.lastName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Email:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">{profile.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Address:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">{profile.address}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="danger"
                onClick={() => {
                  if (window.confirm("Are you sure you want to logout?")) {
                    handleLogout();
                  }
                }}
                sx={{ mt: 3 }}
              >
                Logout
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ mt: 3 }}
              >
                Change password
              </Button>
            </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Current password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                margin="dense"
                label="New password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                margin="dense"
                label="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="danger" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleChangePassword}>
                Change Password
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>

      <Footer />
    </div>
  );
}

export default UserProfilePage;
