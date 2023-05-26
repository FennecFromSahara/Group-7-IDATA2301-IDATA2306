import { useParams, useNavigate } from "react-router-dom";
import { getProfileData } from "../../hooks/apiService";
import { useAuth } from "../../hooks/useAuth";
import { isAdmin } from "../../tools/authentication";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useTheme } from "@emotion/react";
import handleLogout from "../../tools/handleLogout";
import ErrorPage from "../../components/ErrorPage";
import React from "react";

function UserProfilePage() {
  const { user, loading } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [profile, setProfile] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);

  const [error, setError] = useState(null);

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

  //TODO: Change password

  //TODO: Are you sure on Logout

  if (loading || profileLoading) {
    return (
      <div>
        <NavBar />
        <Box
          minHeight={theme.boxSizes.navSectionFooter}
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

      <Box
        style={{
          height: theme.boxSizes.navSectionFooter,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={0} sx={{ p: 3, minWidth: "350px" }}>
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
                onClick={handleLogout}
                sx={{ mt: 3 }}
              >
                Logout
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="danger" sx={{ mt: 3 }}>
                Change password
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Footer />
    </div>
  );
}

export default UserProfilePage;
