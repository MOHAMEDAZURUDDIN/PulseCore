import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Colors } from "../../themes";
import CheckoutSteps from "./CheckoutSteps";
import { validateShipping } from "./Shipping";
import { fetchCart } from "../../redux/actions/cartActions";
import Loader from "../layout/Loader";

export default function ConfirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    shippingInfo,
    items: cartItems,
    loading,
  } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.authState);

  // Fetch cart data on mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Validate shipping info once loading is complete
  useEffect(() => {
    if (!loading && !validateShipping(shippingInfo)) {
      navigate("/shipping");
    }
  }, [loading, shippingInfo, navigate]);

  // Calculate totals
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 400 ? 0 : 10;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = { itemsPrice, shippingPrice, taxPrice, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  // Render Loader while fetching data
  if (loading || !shippingInfo || !cartItems) {
    return <Loader />;
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
          animation: "glow 4s infinite alternate",
          "@keyframes glow": {
            "0%": { opacity: 0.7, transform: "scale(1)" },
            "100%": { opacity: 1, transform: "scale(1.05)" },
          },
        }}
      />

      <Box sx={{ zIndex: 2, width: "100%", maxWidth: 1200, mt: 10 }}>
        <CheckoutSteps shipping confirmOrder />

        <Typography
          variant="h2"
          align="center"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 0 15px ${Colors.neonGreen}80`,
            mb: 6,
          }}
        >
          Confirm Your Order
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
            px: { xs: 2, md: 0 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "33%" },
              bgcolor: `${Colors.darkGray}E6`,
              borderRadius: 3,
              p: 3,
              boxShadow: `0 0 20px ${Colors.neonPink}4D`,
              border: `1px solid ${Colors.neonGreen}33`,
              backdropFilter: "blur(10px)",
            }}
          >
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
            <Typography sx={{ color: Colors.white }}>
              <strong>Address:</strong>{" "}
              <span style={{ color: Colors.neonPink }}>
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                {shippingInfo.country}
              </span>
            </Typography>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "66%" },
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Box
              sx={{
                bgcolor: `${Colors.darkGray}E6`,
                borderRadius: 3,
                p: 3,
                boxShadow: `0 0 20px ${Colors.neonGreen}4D`,
                border: `1px solid ${Colors.neonPink}33`,
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: Colors.neonPink,
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Order Summary
              </Typography>
              <Divider sx={{ bgcolor: Colors.neonGreen, mb: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ color: Colors.white }}>Subtotal:</Typography>
                <Typography
                  sx={{ color: Colors.neonGreen, fontWeight: "bold" }}
                >
                  ${itemsPrice.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ color: Colors.white }}>Shipping:</Typography>
                <Typography
                  sx={{ color: Colors.neonGreen, fontWeight: "bold" }}
                >
                  ${shippingPrice}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ color: Colors.white }}>Tax:</Typography>
                <Typography
                  sx={{ color: Colors.neonGreen, fontWeight: "bold" }}
                >
                  ${taxPrice}
                </Typography>
              </Box>
              <Divider sx={{ bgcolor: Colors.neonPink, my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ color: Colors.white, fontWeight: "bold" }}>
                  Total:
                </Typography>
                <Typography
                  sx={{
                    color: Colors.neonPink,
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  ${totalPrice}
                </Typography>
              </Box>
              <Button
                onClick={processPayment}
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
                  color: Colors.white,
                  fontWeight: "600",
                  fontFamily: "'Orbitron', sans-serif",
                  borderRadius: 2,
                  boxShadow: `0 0 15px ${Colors.neonGreen}80`,
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: `0 0 25px ${Colors.neonPink}B3`,
                    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Proceed to Payment
              </Button>
            </Box>

            <Box
              sx={{
                bgcolor: `${Colors.darkGray}E6`,
                borderRadius: 3,
                p: 3,
                boxShadow: `0 0 20px ${Colors.neonPink}4D`,
                border: `1px solid ${Colors.neonGreen}33`,
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: Colors.neonGreen,
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Your Cart Items
              </Typography>
              <Divider sx={{ bgcolor: Colors.neonPink, mb: 2 }} />
              {cartItems.map((item, i) => (
                <Card
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: `${Colors.semiDark}CC`,
                    borderRadius: 2,
                    mb: 2,
                    p: 2,
                    boxShadow: `0 0 10px ${Colors.neonGreen}80`,
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: `0 0 15px ${Colors.neonPink}B3`,
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 2,
                      transform: "rotate(-12deg)",
                      "&:hover": {
                        transform: "rotate(0deg)",
                        transition: "transform 0.5s ease",
                      },
                    }}
                    image={item.product.images[0]}
                    alt={item.product.name}
                  />
                  <CardContent sx={{ flex: 1, ml: 2 }}>
                    <Typography
                      sx={{
                        color: Colors.white,
                        fontFamily: "'Orbitron', sans-serif",
                      }}
                    >
                      {item.product.name}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: Colors.neonPink,
                        borderRadius: 1,
                        p: 1,
                        textAlign: "center",
                        mt: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: Colors.deepBlack,
                          fontWeight: "bold",
                          fontFamily: "'Orbitron', sans-serif",
                        }}
                      >
                        {item.quantity} x ${item.product.price} = $
                        <span style={{ color: Colors.neonGreen }}>
                          {(item.quantity * item.product.price).toFixed(2)}
                        </span>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
