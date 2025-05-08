import { Box, Button, Typography } from "@mui/material";
import React from "react";
import EmptyImg from "../../assets/images/accessories/empty.png";
import { ArrowBack } from "@mui/icons-material";
import { Colors } from "../../themes/index.js";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        maxHeight: "90vh",
        zIndex: 200,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          background: `${Colors.darkGray}E6`,
          color: Colors.white,
          borderRadius: "12px",
          border: `1px solid ${Colors.neonGreen}33`,
          boxShadow: `0 0 25px ${Colors.warning}4D`,
          maxWidth: 400,
          width: "100%",
          maxHeight: "80vh",
          overflow: "auto",
          "&:hover": {
            boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
          },
        }}
      >
        <img
          src={EmptyImg}
          alt="Empty bag"
          style={{
            width: "200px",
            height: "200px",
            marginBottom: "12px",
            borderRadius: "8px",
            boxShadow: `0 0 10px ${Colors.neonGreen}80`,
          }}
        />
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 0 10px ${Colors.neonGreen}80`,
          }}
        >
          Your Cart is Empty
        </Typography>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            sx={{
              width: "100%",
              marginTop: 1,
              background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
              color: Colors.white,
              padding: "10px 20px",
              borderRadius: "12px",
              boxShadow: `0 0 10px ${Colors.neonGreen}80`,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              "&:hover": {
                background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
                boxShadow: `0 0 15px ${Colors.neonPink}B3`,
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Back to Store
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CartEmpty;
