import { Box, Typography } from "@mui/material";
import React from "react";

/**
 * Displays a tab panel.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <>
      {value === index && (
        <Box>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </>
  );
}

export default TabPanel;
