import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import { Colors } from "../../themes/index.js";

const ProductQTYSelector = ({ quantity, onIncrease, onDecrease, stock }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
      <IconButton
        onClick={onDecrease}
        sx={{
          background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
          color: Colors.white,
          borderRadius: "8px",
          boxShadow: `0 0 10px ${Colors.neonPink}80`,
          "&:hover": {
            background: `linear-gradient(90deg, ${Colors.orangered}, ${Colors.neonPink})`,
            boxShadow: `0 0 15px ${Colors.neonPink}B3`,
            transform: "scale(1.05)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <Remove />
      </IconButton>
      <TextField
        size="small"
        value={quantity}
        inputProps={{ readOnly: true, style: { textAlign: "center" } }}
        sx={{
          width: 60,
          "& .MuiOutlinedInput-root": {
            background: `${Colors.deepBlack}E6`,
            color: Colors.white,
            fontFamily: "'Orbitron', sans-serif",
            "& fieldset": { borderColor: Colors.neonGreen },
            "&:hover fieldset": { borderColor: Colors.neonPink },
            "&.Mui-focused fieldset": { borderColor: Colors.orangered },
          },
          "& .MuiInputLabel-root": { color: Colors.neonGreen },
          "& .MuiInputLabel-root.Mui-focused": { color: Colors.orangered },
        }}
      />
      <IconButton
        onClick={onIncrease}
        disabled={stock === 0 || quantity >= stock}
        sx={{
          background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
          color: Colors.white,
          borderRadius: "8px",
          boxShadow: `0 0 10px ${Colors.neonGreen}80`,
          "&:hover": {
            background: `linear-gradient(90deg, ${Colors.teal}, ${Colors.neonGreen})`,
            boxShadow: `0 0 15px ${Colors.neonGreen}B3`,
            transform: "scale(1.05)",
          },
          "&:disabled": {
            background: Colors.darkGray,
            boxShadow: "none",
            cursor: "not-allowed",
          },
          transition: "all 0.3s ease",
        }}
      >
        <Add />
      </IconButton>
    </Box>
  );
};

export default ProductQTYSelector;
