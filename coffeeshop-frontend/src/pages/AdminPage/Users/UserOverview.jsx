import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Snackbar,
} from "@mui/material";
import { asyncApiRequest } from "../../../tools/requests";
import { useTheme } from "@emotion/react";
import React from "react";
import Alert from "../../../components/Alert";

/**
 * Displays an overview of a user, and functionality to edit and delete the user,
 * and give another user admin priveliges (DO AT YOUR OWN RISK).
 *
 * @returns {JSX.Element} The rendered React component.
 */
const UserOverview = ({ user, setUser, updateUsers, removeUser }) => {
  const theme = useTheme();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const id = user.id;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const updateUser = async () => {
    try {
      const updatedUser = await asyncApiRequest(
        "PUT",
        `/users/${user.username}`,
        {
          id,
          firstName,
          lastName,
          username,
          email,
          address,
        }
      );

      // Merge old user data and updated user data
      const mergedUser = {
        ...user,
        ...updatedUser,
      };

      setUser(mergedUser);
      updateUsers(mergedUser);

      setAlertState("success");
      setAlertMessage("User has been updated");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setAlertState("error");
      setAlertMessage("Error updating user");
      setAlertOpen(true);
    }
  };

  const toggleAdminRole = async () => {
    try {
      let newRoles;
      if (user.roles.includes("ROLE_ADMIN")) {
        newRoles = await asyncApiRequest(
          "PUT",
          `/users/${username}/remove-admin`
        );
      } else {
        newRoles = await asyncApiRequest(
          "PUT",
          `/users/${username}/make-admin`
        );
      }

      const mergedUser = {
        ...user,
        ...newRoles,
      };

      setUser(mergedUser);
      updateUsers(mergedUser);
      setAlertState("success");
      setAlertMessage("ADMIN status has been updated");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error updating user's admin status:", error);
      setAlertState("error");
      setAlertMessage("Error updating ADMIN status");
      setAlertOpen(true);
    }
  };

  const deleteUser = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      try {
        await asyncApiRequest("DELETE", `/users/${user.username}`);
        setUser(null);
        removeUser(user.id);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const backToUsers = () => {
    setUser(null);
  };

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertState}
          alertState={alertState}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 2,
          borderRadius: 2,
          border: `2px solid ${theme.palette.primary.light}`,
          m: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%", // or a specific height
        }}
      >
        <Grid container>
          <Grid item xs>
            <Typography variant="h1" gutterBottom>
              User Overview: {username} (id: {user.id})
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={backToUsers}>
              Back
            </Button>
          </Grid>
        </Grid>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
        />
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: theme.palette.primary.contrastText, mb: 3 }}
        />
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={updateUser}
              sx={{ mr: 2, mt: 2 }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="danger"
              onClick={deleteUser}
              sx={{ mr: 2, mt: 2 }}
            >
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color={user.roles.includes("ROLE_ADMIN") ? "error" : "warning"}
              onClick={toggleAdminRole}
            >
              {user.roles.includes("ROLE_ADMIN")
                ? "Remove Admin Privileges"
                : "Make Admin"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserOverview;
