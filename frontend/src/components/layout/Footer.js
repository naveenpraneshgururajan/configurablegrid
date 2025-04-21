import React from "react";
import { Box, Typography } from "@mui/material";
import { headerFooterLabels } from "../../constant/label";
const { footer } = headerFooterLabels;

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        borderTop: `2px solid`,
        borderColor: "primary.main",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {footer}
      </Typography>
    </Box>
  );
};

export default Footer;
