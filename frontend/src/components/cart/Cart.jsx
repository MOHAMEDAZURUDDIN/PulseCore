import React, { useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { Colors } from "../../themes/index.js";
import { useNavigate } from "react-router-dom";
import CartCount from "./CartCount";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../utils/CustomButton";
import Loader from "../../components/layout/Loader";
import { clearCart, fetchCart } from "../../redux/actions/cartActions";
import { resetSnackbar } from "../../redux/slices/CartSlice";
import CustomSnackbar from "../../utils/CustomSnackbar";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items,
    loading,
    Snackbar: cartSnackbarState,
  } = useSelector((state) => state.cartState);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const onClearCartItems = () => {
    dispatch(clearCart());
    navigate("/");
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  const handleCartSnackbarClose = () => {
    dispatch(resetSnackbar());
  };

  const subtotal =
    items?.length > 0
      ? items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      : 0;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: Colors.deepBlack,
        backdropFilter: "blur(10px)", // Background blur effect
        zIndex: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: 2, sm: 4 },
        mt: 6,
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: `linear-gradient(135deg, ${Colors.seagreen} 0%, ${Colors.orangered} 100%)`,
          clipPath: "polygon(30% 0, 100% 60%, 10% 60%, 0 100%)",
          opacity: 0.9,
          zIndex: 0,
          animation: "pulse 4s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.7, transform: "scale(1)" },
            "100%": { opacity: 1, transform: "scale(1.05)" },
          },
        },
      }}
    >
      <CustomSnackbar
        open={cartSnackbarState.open}
        message={cartSnackbarState.message}
        severity={cartSnackbarState.severity}
        handleClose={handleCartSnackbarClose}
      />
      <Box
        sx={{
          width: "100%",
          height: "auto",
          maxWidth: 1000,
          background: `${Colors.darkGray}E6`,
          borderRadius: "16px",
          border: `1px solid ${Colors.neonGreen}33`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 0 25px ${Colors.warning}4D`,
          overflow: "hidden",
          zIndex: 1,
          "&:hover": {
            boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
          },
        }}
      >
        {/* Cart Header */}
        <CartCount
          totalQTY={items?.length || 0}
          onClearCartItems={onClearCartItems}
        />
        <Divider
          sx={{
            borderColor: `${Colors.neonGreen}33`,
            boxShadow: `0 0 5px ${Colors.neonGreen}80`,
          }}
        />

        {/* Box Layout for Cart Items and Subtotal */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            padding: 2,
          }}
        >
          {/* Cart Items Section */}
          <Box sx={{ flex: 7, padding: 1 }}>
            <Box
              sx={{
                maxHeight: "60vh",
                overflowY: "auto",
                padding: 3,
                background: `${Colors.deepBlack}E6`,
                borderRadius: "12px",
                boxShadow: `0 0 15px ${Colors.neonGreen}80`,
              }}
            >
              {loading ? (
                <Loader />
              ) : !items || items.length === 0 ? (
                <CartEmpty />
              ) : (
                items.map((cartItem, i) => (
                  <CartItem key={cartItem.product._id} item={cartItem} />
                ))
              )}
            </Box>
          </Box>

          {/* Subtotal Section */}
          <Box sx={{ flex: 5, padding: 1 }}>
            <Box
              sx={{
                padding: 3,
                background: `${Colors.deepBlack}E6`,
                borderRadius: "12px",
                boxShadow: `0 0 15px ${Colors.neonGreen}80`,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{ color: Colors.white }}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  SubTotal
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  ${subtotal}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                textAlign="center"
                sx={{
                  mt: 1,
                  color: `${Colors.neonGreen}80`,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Taxes and Shipping Will Calculate At Shipping
              </Typography>
              <CustomButton
                label="Check Out"
                onClick={checkoutHandler}
                disabled={items.length === 0}
                sx={{
                  mt: 2,
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
                  "&:disabled": {
                    background: Colors.darkGray,
                    boxShadow: "none",
                    cursor: "not-allowed",
                  },
                  transition: "all 0.3s ease",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
