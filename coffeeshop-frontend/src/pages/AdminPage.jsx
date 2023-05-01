import { Typography } from "@mui/material";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function AdminPage(props) {
  const user = props.user;

  return (
    <div>
      <NavBar user={user} />

      <Typography>You are admin</Typography>

      <Footer />
    </div>
  );
}

export default AdminPage;
