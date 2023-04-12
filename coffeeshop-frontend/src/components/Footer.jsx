import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

function Footer() {
  const theme = useTheme();

  return (
    <div>
      <Box
        sx={{
          height: "30vh",
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Typography variant="h1" sx={{ p: 3 }}>
          Contact info
        </Typography>
        <Typography sx={{ pl: 3 }}>address address address</Typography>
        <Typography sx={{ pl: 3 }}>mailmailmail@mail.com</Typography>
        <Typography sx={{ pl: 3 }}>+4700000000</Typography>
        <Typography sx={{ pl: 3 }}>@2023</Typography>
      </Box>
    </div>
  );
}

export default Footer;
