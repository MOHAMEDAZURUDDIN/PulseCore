import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import CustomSnackbar from "../../utils/CustomSnackbar.jsx";
import { Colors } from "../../themes/index.js";
import { changePassword } from "../../redux/actions/userActions.js";
import { clearError, clearUpdate } from "../../redux/slices/authSlice.js";

export default function UpdatePassword() {
  const { loading, error, isUpdated, isAuthenticated } = useSelector(
    (state) => ({
      loading: state.authState.loading,
      error: state.authState.error,
      isUpdated: state.authState.isUpdated,
      isAuthenticated: state.authState.isAuthenticated,
    }),
    shallowEqual
  );
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!oldPassword.trim() || !password.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter both old and new passwords",
        severity: "error",
      });
      return;
    }
    const formData = { oldPassword, password };
    dispatch(changePassword(formData));
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
    if (snackbar.severity === "success") dispatch(clearUpdate());
    if (snackbar.severity === "error") {
      dispatch(clearError());
      if (
        error === "Login first to handle this resource" ||
        error === "User not found"
      ) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isUpdated) {
      setSnackbar({
        open: true,
        message: "Password updated successfully",
        severity: "success",
      });
      setOldPassword("");
      setPassword("");
    }

    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
    }
  }, [isUpdated, error, dispatch, isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        background: Colors.deepBlack,
        color: Colors.white,
        minHeight: "100vh",
        p: 8,
        position: "relative",
        overflow: "hidden",
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
      <Box
        sx={{
          mt: 8,
          textAlign: "center",
          zIndex: 1,
          position: "relative",
        }}
      >
        {/* Title */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "2.8rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 20px ${Colors.neonGreen}80`,
              "& span": {
                background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.seagreen})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
            }}
          >
            Update <span>Password</span>
          </Typography>
        </Box>

        {/* Form Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            background: `${Colors.darkGray}E6`,
            borderRadius: "16px",
            border: `1px solid ${Colors.neonGreen}33`,
            backdropFilter: "blur(10px)",
            boxShadow: `0 0 25px ${Colors.warning}4D`,
            padding: 4,
            maxWidth: 600,
            mx: "auto",
            "&:hover": {
              boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
            },
          }}
        >
          {/* Form Fields */}
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
            }}
          >
            <TextField
              label="Old Password"
              variant="outlined"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: Colors.neonGreen }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      edge="end"
                    >
                      {showOldPassword ? (
                        <VisibilityOff sx={{ color: Colors.neonGreen }} />
                      ) : (
                        <Visibility sx={{ color: Colors.neonGreen }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: `${Colors.deepBlack}E6`,
                  color: Colors.white,
                  "& fieldset": { borderColor: Colors.neonGreen },
                  "&:hover fieldset": { borderColor: Colors.neonPink },
                  "&.Mui-focused fieldset": { borderColor: Colors.orangered },
                },
                "& .MuiInputLabel-root": { color: Colors.neonGreen },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Colors.orangered,
                },
              }}
            />
            <TextField
              label="New Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: Colors.neonGreen }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: Colors.neonGreen }} />
                      ) : (
                        <Visibility sx={{ color: Colors.neonGreen }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: `${Colors.deepBlack}E6`,
                  color: Colors.white,
                  "& fieldset": { borderColor: Colors.neonGreen },
                  "&:hover fieldset": { borderColor: Colors.neonPink },
                  "&.Mui-focused fieldset": { borderColor: Colors.orangered },
                },
                "& .MuiInputLabel-root": { color: Colors.neonGreen },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Colors.orangered,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
                color: Colors.white,
                padding: "10px 0",
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
                  cursor: "not-allowed",
                  boxShadow: "none",
                },
                transition: "all 0.3s ease",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update Password"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleSnackbarClose}
      />
    </Box>
  );
}
