import { useTheme } from "@emotion/react";
import MuiAlert from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef(function Alert({ alertState, ...other }, ref) {
  const theme = useTheme();
  let color;

  switch (alertState) {
    case "success":
      color = theme.palette.primary.main;
      break;
    case "error":
    case "warning":
      color = theme.palette.warning;
      break;
    case "error-login":
      color = theme.palette.danger.main;
      break;
    default:
      color = "grey";
  }

  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...other}
      sx={{
        backgroundColor: color,
        "& .MuiAlert-message": {
          color: theme.palette.primary.contrastText,
        },
      }}
    />
  );
});

export default Alert;
