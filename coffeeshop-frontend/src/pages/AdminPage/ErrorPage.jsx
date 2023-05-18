import { Typography, Box } from "@mui/material";

function ErrorPage({ error }) {
  return (
    <Box
      minHeight="94vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h2">{error}</Typography>
    </Box>
  );
}

export default ErrorPage;
