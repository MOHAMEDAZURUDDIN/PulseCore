import React, { useEffect } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../redux/actions/orderActions"; // Updated import path
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader.jsx";
import { Colors } from "../../themes";

export default function UserOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userOrders = [],
    loading,
    error,
  } = useSelector((state) => state.orderState);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: Colors.deepBlack,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: Colors.neonPink,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.5rem",
          }}
        >
          Error: {error}
        </Typography>
      </Box>
    );
  }

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
      <Box sx={{ zIndex: 2, width: "100%", maxWidth: 1200, mt: 10 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 0 20px ${Colors.neonGreen}80`,
            mb: 6,
          }}
        >
          Your Orders
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
          {userOrders.length === 0 ? (
            <Typography
              sx={{
                color: Colors.white,
                fontFamily: "'Orbitron', sans-serif",
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            >
              No Orders Found
            </Typography>
          ) : (
            userOrders.map((order) => (
              <Box
                key={order._id}
                sx={{
                  bgcolor: Colors.semiDark,
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: `0 0 15px ${Colors.neonPink}B3`,
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: Colors.neonPink,
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  Order ID: {order._id}
                </Typography>
                <Divider sx={{ bgcolor: Colors.neonGreen, mb: 2 }} />
                <Typography
                  sx={{
                    color: Colors.white,
                    fontFamily: "'Orbitron', sans-serif', mb: 1",
                  }}
                >
                  Items: {order.orderItems.length}
                </Typography>
                <Typography
                  sx={{
                    color: Colors.white,
                    fontFamily: "'Orbitron', sans-serif', mb: 1",
                  }}
                >
                  Amount:{" "}
                  <span style={{ color: Colors.neonGreen }}>
                    ${order.totalPrice}
                  </span>
                </Typography>
                <Typography
                  sx={{
                    color:
                      order.orderStatus === "Delivered"
                        ? Colors.neonGreen
                        : Colors.neonPink,
                    fontFamily: "'Orbitron', sans-serif",
                    mb: 2,
                  }}
                >
                  Status: {order.orderStatus}
                </Typography>
                <Button
                  component={Link}
                  to={`/order/${order._id}`}
                  variant="contained"
                  sx={{
                    background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
                    color: Colors.white,
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: "600",
                    borderRadius: 2,
                    "&:hover": {
                      background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
                      transform: "translateY(-2px)",
                      boxShadow: `0 0 15px ${Colors.neonPink}B3`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  View Details
                </Button>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
