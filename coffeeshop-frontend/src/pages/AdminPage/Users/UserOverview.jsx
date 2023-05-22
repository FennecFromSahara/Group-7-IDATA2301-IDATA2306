import { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { asyncApiRequest } from "../../../tools/requests";
import { useTheme } from "@emotion/react";

const UserOverview = ({ user, setUser, updateUsers, removeUser }) => {
  const theme = useTheme();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const id = user.id;

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
      window.alert("User has been updated");
    } catch (error) {
      console.error("Error updating user:", error);
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
      window.alert("User's admin status has been updated");
    } catch (error) {
      console.error("Error updating user's admin status:", error);
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
            style={{ marginRight: 2 }}
          >
            Save
          </Button>
          <Button variant="contained" color="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color={user.roles.includes("ROLE_ADMIN") ? "error" : "warning"}
            onClick={toggleAdminRole}
            style={{ marginRight: 2 }}
          >
            {user.roles.includes("ROLE_ADMIN")
              ? "Remove Admin Privileges"
              : "Make Admin"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserOverview;
