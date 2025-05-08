import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import successImg from "../../assets/images/accessories/success.png";
import { Colors } from "../../themes/index.js";

export default function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    var end = Date.now() + 15 * 1000;
    var colors = ["#bb0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: Colors.deepBlack,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      {/* Animated Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50vh",
          background: `linear-gradient(135deg, ${Colors.semiDark} 0%, ${Colors.warning} 100%)`,
          clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)",
          opacity: 0.9,
          zIndex: 0,
          animation: "pulse 4s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.7, transform: "scale(1)" },
            "100%": { opacity: 1, transform: "scale(1.05)" },
          },
        }}
      />

      {/* Main Content */}
      <Box
        sx={{ zIndex: 2, width: "100%", maxWidth: 600, textAlign: "center" }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 0 20px ${Colors.neonGreen}80`,
            mt: 2,
            mb: 2,
          }}
        >
          Order Confirmed!
        </Typography>

        <Box
          sx={{
            bgcolor: `${Colors.darkGray}E6`,
            borderRadius: 4,
            p: 4,
            boxShadow: `0 0 25px ${Colors.neonPink}4D`,
            border: `1px solid ${Colors.neonGreen}33`,
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
            },
          }}
        >
          <Box
            component="img"
            src={successImg}
            alt="Order Success"
            sx={{
              width: 256,
              height: 216,
              mx: "auto",
              objectFit: "contain",
              mb: 2,
              borderRadius: 2,
              boxShadow: `0 0 20px ${Colors.neonGreen}80`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: Colors.neonGreen,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Your Order Has Been Placed Successfully!
          </Typography>

          <Button
            onClick={() => navigate("/orders")}
            variant="contained"
            sx={{
              py: 1.5,
              background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
              color: Colors.white,
              fontWeight: "600",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "1.2rem",
              borderRadius: 2,
              boxShadow: `0 0 20px ${Colors.neonGreen}80`,
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: `0 0 30px ${Colors.neonPink}B3`,
                background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
              },
              transition: "all 0.3s ease",
            }}
          >
            Go to Orders
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
