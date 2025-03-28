import React from "react";
import { Box, Chip, IconButton } from "@mui/material";
import { Colors } from "../../themes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SwipeRightAltIcon from "@mui/icons-material/SwipeRightAlt";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cartState);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const stepObject = [
    {
      label: "Shipping",
      active: shipping,
      nextActive: confirmOrder,
      link: "/shipping",
    },
    {
      label: "Confirm Order",
      active: confirmOrder,
      nextActive: payment,
      link: "/order/confirm",
    },
    { label: "Payment", active: payment, link: "/payment" },
  ];

  const validateShipping = (info) => {
    return (
      info?.address &&
      info?.city &&
      info?.state &&
      info?.country &&
      info?.phoneNo &&
      info?.postalCode
    );
  };

  const handleStepClick = (link, index) => {
    if (index === 0) {
      navigate(link);
    } else if (index === 1 && validateShipping(shippingInfo)) {
      navigate(link);
    } else if (index === 2 && orderInfo) {
      navigate(link);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        mb: 4,
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "10%",
          right: "10%",
          height: "2px",
          bgcolor: `${Colors.neonGreen}4D`,
          zIndex: 0,
        },
      }}
    >
      {stepObject.map((step, index) => {
        const isClickable =
          index === 0 ||
          (index === 1 && validateShipping(shippingInfo)) ||
          (index === 2 && orderInfo);

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              zIndex: 1,
            }}
          >
            <Chip
              label={step.label}
              onClick={() =>
                isClickable ? handleStepClick(step.link, index) : null
              }
              sx={{
                bgcolor: step.active ? Colors.neonGreen : Colors.semiDark,
                color: step.active ? Colors.deepBlack : Colors.muted,
                fontWeight: "bold",
                fontFamily: "'Orbitron', sans-serif",
                boxShadow: step.active
                  ? `0 0 15px ${Colors.neonGreen}B3`
                  : "none",
                "&:hover": {
                  bgcolor:
                    isClickable && !step.active
                      ? Colors.neonGreen
                      : Colors.shaft,
                  color: step.active ? Colors.deepBlack : Colors.white,
                  cursor: isClickable ? "pointer" : "default",
                },
                transition: "all 0.3s ease",
              }}
            />
            {step.nextActive && (
              <IconButton
                sx={{
                  color: Colors.shaft,
                  fontSize: "1.5rem",
                }}
              >
                <SwipeRightAltIcon fontSize="large" />
              </IconButton>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default CheckoutSteps;
