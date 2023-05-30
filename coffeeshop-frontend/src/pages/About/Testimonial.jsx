import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import React from "react";

/**
 * Represents a Testemonal component, where a comment and author is displayed.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function Testimonial({ name, comment }) {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          mx: 3,
          my: 3,
        }}
      >
        <i>"{comment}"</i> - <b>{name}:</b>
      </Typography>
    </Box>
  );
}

Testimonial.propTypes = {
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Testimonial;
