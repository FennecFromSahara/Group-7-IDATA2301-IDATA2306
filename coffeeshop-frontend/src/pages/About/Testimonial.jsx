import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

function Testimonial({ name, comment }) {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          mx: 15,
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
