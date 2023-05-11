import { Typography, Box } from "@mui/material";

function ErrorPage({ error }) {
  return (
    <Box
      minHeight="62vh"
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
