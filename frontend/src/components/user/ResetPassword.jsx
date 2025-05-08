import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Colors } from "../../themes";
import ResetImg from "../../assets/images/auth/Resetpassword.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomSnackbar from "../../utils/CustomSnackbar";
import { clearError } from "../../redux/slices/authSlice";
import { resetPassword } from "../../redux/actions/userActions";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { isAuthenticated, error } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setSnackbar({
        open: true,
        message: "Password Reset Success!",
        type: "success",
      });
      navigate("/");
      return;
    }
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        type: "error",
      });
      dispatch(clearError());
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: Colors.dark,
        color: Colors.inverse,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: Colors.secondary,
          width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
          height: { xs: "auto", md: "70vh" },
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Left image section */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${ResetImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
          }}
        />
        {/* Form section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Reset Password
          </Typography>
          <form
            style={{ width: "100%", maxWidth: 400 }}
            onSubmit={submitHandler}
          >
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                marginTop: 2,
                backgroundColor: Colors.dark,
                color: Colors.info,
                "&:hover": { backgroundColor: Colors.dim_gray },
              }}
            >
              Set Password
            </Button>
          </form>
          <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.type}
            handleClose={handleCloseSnackbar}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
