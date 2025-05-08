import React from "react";
import { ChevronLeft } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Colors } from "../../themes/index.js";

const CartCount = ({ totalQTY, onClearCartItems }) => {
  const navigate = useNavigate();

  const handleCloseCart = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: `${Colors.deepBlack}E6`,
        color: Colors.white,
        padding: 1,
        borderBottom: `1px solid ${Colors.neonGreen}33`,
        boxShadow: `0 0 10px ${Colors.neonGreen}80`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={handleCloseCart}
          sx={{
            minWidth: "auto",
            background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
            color: Colors.white,
            borderRadius: "8px",
            boxShadow: `0 0 10px ${Colors.neonGreen}80`,
            "&:hover": {
              background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
              boxShadow: `0 0 15px ${Colors.neonPink}B3`,
            },
            transition: "all 0.3s ease",
          }}
        >
          <ChevronLeft fontSize="large" />
        </Button>
        <Typography
          variant="h6"
          sx={{
            marginLeft: 1,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Your Cart{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              padding: "4px 8px",
              borderRadius: "4px",
              textShadow: `0 0 10px ${Colors.neonGreen}80`,
            }}
          >
            ({totalQTY} Items)
          </span>
        </Typography>
      </Box>
      <Button
        onClick={onClearCartItems}
        sx={{
          minWidth: "auto",
          background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
          color: Colors.white,
          borderRadius: "8px",
          boxShadow: `0 0 10px ${Colors.neonPink}80`,
          "&:hover": {
            background: `linear-gradient(90deg, ${Colors.orangered}, ${Colors.neonPink})`,
            boxShadow: `0 0 15px ${Colors.neonPink}B3`,
          },
          transition: "all 0.3s ease",
        }}
      >
        <CloseIcon fontSize="large" />
      </Button>
    </Box>
  );
};

export default CartCount;
