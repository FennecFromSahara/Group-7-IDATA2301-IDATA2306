import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Box, Typography } from "@mui/material";

function Secret(props) {
  const user = props.user;

  return (
    <Box>
      <NavBar user={user} />

      <Box minHeight="92vh" display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          Box
          flex={1}
          overflow="auto"
        >
          <Typography type="h1">
            Shh... pretend like this is the link you wanted.
          </Typography>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default Secret;
