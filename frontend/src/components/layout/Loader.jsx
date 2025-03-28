import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ width: "80%", backgroundColor: "yellow", borderRadius: "10px" }}
      >
        <LinearProgress
          sx={{ height: "10px", borderRadius: "10px", bgcolor: "grey" }}
        />
      </Box>
    </Box>
  );
}
