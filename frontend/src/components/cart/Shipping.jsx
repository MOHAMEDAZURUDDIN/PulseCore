import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Fade,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../redux/actions/cartActions";
import { resetSnackbar } from "../../redux/slices/CartSlice";
import { Colors } from "../../themes";
import CheckoutSteps from "./CheckoutSteps";

export const validateShipping = (shippingInfo) => {
  return (
    shippingInfo.address &&
    shippingInfo.city &&
    shippingInfo.state &&
    shippingInfo.country &&
    shippingInfo.phoneNo &&
    shippingInfo.postalCode
  );
};

const Shipping = () => {
  const { shippingInfo = {}, Snackbar: cartSnackbarState } = useSelector(
    (state) => state.cartState
  );
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingDetails = [
    { label: "Address", value: address, setter: setAddress },
    { label: "City", value: city, setter: setCity },
    { label: "Phone Number", value: phoneNo, setter: setPhoneNo, type: "tel" },
    {
      label: "Postal Code",
      value: postalCode,
      setter: setPostalCode,
      type: "number",
    },
    { label: "State", value: state, setter: setState },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    if (country !== "United States") {
      dispatch({
        type: "cart/saveShippingInfo/rejected",
        payload: "Only USA shipping available right now, bro!",
      });
      return;
    }
    const newShippingInfo = {
      address,
      city,
      phoneNo,
      postalCode,
      country,
      state,
    };
    if (!validateShipping(newShippingInfo)) {
      dispatch({
        type: "cart/saveShippingInfo/rejected",
        payload: "Fill out all the fields, dude!",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(saveShippingInfo(newShippingInfo)).unwrap();
      navigate("/order/confirm");
    } catch (error) {
      console.error("Failed to save shipping info:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    dispatch(resetSnackbar());
  };

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
          animation: "pulse 4s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.7, transform: "scale(1)" },
            "100%": { opacity: 1, transform: "scale(1.05)" },
          },
        }}
      />

      <Box sx={{ zIndex: 2, width: "100%", maxWidth: 600, mt: 10 }}>
        <CheckoutSteps shipping />
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
          Drop Your Shipping Info
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
          <Box component="form" onSubmit={submitHandler}>
            {shippingDetails.map((field, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    color: Colors.neonPink,
                    mb: 1,
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {field.label}
                </Typography>
                <TextField
                  fullWidth
                  type={field.type || "text"}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  required
                  variant="outlined"
                  disabled={isSubmitting}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: `${Colors.semiDark}CC`,
                      color: Colors.white,
                      borderRadius: 2,
                      "& fieldset": { borderColor: Colors.neonGreen },
                      "&:hover fieldset": { borderColor: Colors.neonPink },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.neonPink,
                        boxShadow: `0 0 10px ${Colors.neonPink}`,
                      },
                    },
                    "& .MuiInputLabel-root": { color: Colors.neonGreen },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.neonPink,
                    },
                  }}
                />
              </Box>
            ))}

            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  color: Colors.neonPink,
                  mb: 1,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Country
              </Typography>
              <Select
                fullWidth
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                displayEmpty
                disabled={isSubmitting}
                sx={{
                  bgcolor: `${Colors.semiDark}CC`,
                  color: Colors.white,
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: Colors.neonGreen,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: Colors.neonPink,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: Colors.neonPink,
                    boxShadow: `0 0 10px ${Colors.neonPink}`,
                  },
                  "& .MuiSvgIcon-root": { color: Colors.neonGreen },
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select Your Zone</em>
                </MenuItem>
                {countryList.map((c, i) => (
                  <MenuItem
                    key={i}
                    value={c.name}
                    sx={{
                      color: Colors.dark,
                      fontFamily: "'Orbitron', sans-serif",
                    }}
                  >
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
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
              {isSubmitting ? "Saving..." : "Lock It In"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={cartSnackbarState.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={cartSnackbarState.severity}
          sx={{
            bgcolor: Colors.darkGray,
            color:
              cartSnackbarState.severity === "success"
                ? Colors.neonGreen
                : Colors.neonPink,
            border: "1px solid",
            borderColor:
              cartSnackbarState.severity === "success"
                ? Colors.neonGreen
                : Colors.neonPink,
            fontWeight: "bold",
            boxShadow: `0 0 10px ${Colors.neonPink}80`,
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          {cartSnackbarState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Shipping;
