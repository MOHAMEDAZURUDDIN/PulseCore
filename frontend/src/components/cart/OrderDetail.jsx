import React, { useEffect } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getOrderDetail } from "../../redux/actions/orderActions";
import Loader from "../layout/Loader.jsx";
import { Colors } from "../../themes";

export default function OrderDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    orderDetail = {},
    loading,
    error,
  } = useSelector((state) => state.orderState);

  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo?.status === "succeeded";

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

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
    <>
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
            Order #{orderDetail._id}
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
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* Left Section: Shipping, Payment, Status */}
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: Colors.neonGreen,
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Shipping Info
              </Typography>
              <Divider sx={{ bgcolor: Colors.neonPink, mb: 2 }} />
              <Typography sx={{ color: Colors.white, mb: 1 }}>
                <strong>Name:</strong>{" "}
                <span style={{ color: Colors.neonPink }}>{user.name}</span>
              </Typography>
              <Typography sx={{ color: Colors.white, mb: 1 }}>
                <strong>Phone:</strong>{" "}
                <span style={{ color: Colors.neonPink }}>
                  {shippingInfo.phoneNo}
                </span>
              </Typography>
              <Typography sx={{ color: Colors.white, mb: 4 }}>
                <strong>Address:</strong>{" "}
                <span style={{ color: Colors.neonPink }}>
                  {shippingInfo.address}, {shippingInfo.city},{" "}
                  {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                  {shippingInfo.country}
                </span>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: Colors.neonGreen,
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Payment
              </Typography>
              <Divider sx={{ bgcolor: Colors.neonPink, mb: 2 }} />
              <Typography sx={{ color: Colors.white, mb: 1 }}>
                <strong>Amount:</strong>{" "}
                <span style={{ color: Colors.neonGreen }}>${totalPrice}</span>
              </Typography>
              <Typography
                sx={{
                  color: isPaid ? Colors.neonGreen : Colors.neonPink,
                  mb: 4,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                <strong>{isPaid ? "PAID" : "NOT PAID"}</strong>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: Colors.neonGreen,
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Order Status
              </Typography>
              <Divider sx={{ bgcolor: Colors.neonPink, mb: 2 }} />
              <Typography
                sx={{
                  color:
                    orderStatus === "Delivered"
                      ? Colors.neonGreen
                      : Colors.neonPink,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                <strong>{orderStatus}</strong>
              </Typography>
            </Box>

            {/* Right Section: Order Items */}
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: Colors.neonGreen,
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Order Items
              </Typography>
              <Divider sx={{ bgcolor: Colors.neonPink, mb: 2 }} />
              {orderItems.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: Colors.semiDark,
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                    boxShadow: `0 0 10px ${Colors.neonGreen}80`,
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: `0 0 15px ${Colors.neonPink}B3`,
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "contain",
                      borderRadius: 2,
                      transform: "rotate(-12deg)",
                      "&:hover": {
                        transform: "rotate(0deg)",
                        transition: "transform 0.5s ease",
                      },
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        color: Colors.white,
                        fontFamily: "'Orbitron', sans-serif",
                        mb: 1,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: Colors.neonGreen,
                        fontFamily: "'Orbitron', sans-serif",
                      }}
                    >
                      {item.quantity} x ${item.price} = $
                      <span style={{ color: Colors.neonPink }}>
                        {(item.quantity * item.price).toFixed(2)}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Button
                component={Link}
                to="/orders"
                variant="contained"
                sx={{
                  mt: 2,
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
                Back to Orders
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
