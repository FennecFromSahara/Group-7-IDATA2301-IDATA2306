import {Typography} from "@mui/material";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function AdminPage() {
  return (
    <div>
      <NavBar />

      <Typography>You are admin</Typography>

      <Footer />
    </div>
  );
}

export default AdminPage;
