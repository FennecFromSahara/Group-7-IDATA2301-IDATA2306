import { Typography, Box } from "@mui/material";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

function NoAccessPage() {
  return (
    <div>
      <NavBar />

      <Box
        minHeight="62vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2">
          You do not have access to this page
        </Typography>
      </Box>

      <Footer />
    </div>
  );
}

export default NoAccessPage;
