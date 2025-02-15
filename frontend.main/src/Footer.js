import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        textAlign: "center",
        padding: 2,
        backgroundColor: "#1976D2", // Nice blue
        color: "white",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        Developed and Maintained by MIS
      </Typography>
    </Box>
  );
};

export default Footer;
