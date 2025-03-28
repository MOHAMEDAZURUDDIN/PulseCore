import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Colors } from "../../themes";
import { validateShipping } from "./Shipping";
import CheckoutSteps from "./CheckoutSteps";
import { createOrder } from "../../redux/actions/orderActions";
import { clearCart } from "../../redux/actions/cartActions";
import Loader from "../layout/Loader.jsx";
import CustomSnackbar from "../../utils/CustomSnackbar";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const { user } = useSelector((state) => state.authState);
  const {
    items: cartItems,
    shippingInfo,
    loading: cartLoading,
  } = useSelector((state) => state.cartState);
  const { loading: orderLoading } = useSelector((state) => state.orderState);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, [navigate, shippingInfo]);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      image: item.product.images[0],
      price: item.product.price,
      product: item.product._id,
    })),
    shippingInfo,
    itemsPrice: orderInfo.itemsPrice,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const clientSecret = data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setSubmissionError(result.error.message);
        setIsSubmitting(false);
      } else if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        await dispatch(createOrder(order));
        dispatch(clearCart());
        sessionStorage.removeItem("orderInfo");
        navigate("/order/success");
      } else {
        setSubmissionError("Payment failed unexpectedly");
        setIsSubmitting(false);
      }
    } catch (error) {
      setSubmissionError(error.message || "An error occurred during payment");
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSubmissionError(null);
  };

  if (cartLoading || orderLoading || !stripe || !elements) return <Loader />;

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
      <Box sx={{ zIndex: 2, width: "100%", maxWidth: 600, mt: 10 }}>
        <CheckoutSteps shipping confirmOrder payment />

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
          Secure Payment
        </Typography>

        {/* Payment Card */}
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
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: Colors.neonGreen,
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
            }}
          >
            Enter Card Details
          </Typography>

          <Box component="form" onSubmit={submitHandler}>
            {/* Card Number */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  color: Colors.neonPink,
                  mb: 1,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Card Number
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: `${Colors.semiDark}CC`,
                  borderRadius: 2,
                  border: `1px solid ${Colors.neonGreen}80`,
                  "&:hover": {
                    borderColor: Colors.neonPink,
                    boxShadow: `0 0 15px ${Colors.neonGreen}80`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CardNumberElement
                  options={{
                    style: {
                      base: {
                        color: Colors.white,
                        fontSize: "18px",
                        fontFamily: "'Orbitron', sans-serif",
                        "::placeholder": { color: Colors.dove_gray },
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Card Expiry */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  color: Colors.neonPink,
                  mb: 1,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Expiry Date
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: `${Colors.semiDark}CC`,
                  borderRadius: 2,
                  border: `1px solid ${Colors.neonGreen}80`,
                  "&:hover": {
                    borderColor: Colors.neonPink,
                    boxShadow: `0 0 15px ${Colors.neonGreen}80`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        color: Colors.white,
                        fontSize: "18px",
                        fontFamily: "'Orbitron', sans-serif",
                        "::placeholder": { color: Colors.dove_gray },
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Card CVC */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  color: Colors.neonPink,
                  mb: 1,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                CVC Code
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: `${Colors.semiDark}CC`,
                  borderRadius: 2,
                  border: `1px solid ${Colors.neonGreen}80`,
                  "&:hover": {
                    borderColor: Colors.neonPink,
                    boxShadow: `0 0 15px ${Colors.neonGreen}80`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        color: Colors.white,
                        fontSize: "18px",
                        fontFamily: "'Orbitron', sans-serif",
                        "::placeholder": { color: Colors.dove_gray },
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Pay Button */}
            <Button
              type="submit"
              fullWidth
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
                "&:disabled": {
                  background: Colors.dove_gray,
                  boxShadow: "none",
                  cursor: "not-allowed",
                },
                transition: "all 0.3s ease",
              }}
              disabled={!stripe || !elements || !orderInfo || isSubmitting}
            >
              {isSubmitting ? "Processing..." : `Pay $${orderInfo?.totalPrice}`}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Error Snackbar */}
      <CustomSnackbar
        open={!!submissionError}
        message={submissionError || "Payment failed"}
        severity="error"
        handleClose={handleSnackbarClose}
      />
    </Box>
  );
}
