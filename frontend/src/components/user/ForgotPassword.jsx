import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CustomSnackbar from "../../utils/CustomSnackbar.jsx";
import CustomButton from "../../utils/CustomButton.jsx";
import {
  ForgotPasswordContainer,
  ForgotPasswordForm,
  ForgotPasswordFormSection,
  ForgotPasswordImage,
  ForgotPasswordInput,
  ForgotpasswordTitle,
  ForgotPasswordWrapper,
} from "../../styles/forgotPassword/index.js";
import { clearError } from "../../redux/slices/authSlice.js";
import { forgotPassword } from "../../redux/actions/userActions.js";
import { Colors } from "../../themes/index.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const dispatch = useDispatch();
  const { error, message } = useSelector(
    (state) => ({
      error: state.authState.error,
      message: state.authState.message,
    }),
    shallowEqual
  );

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", email);
      dispatch(forgotPassword(formData));
    },
    [dispatch, email]
  );

  useEffect(() => {
    if (message) {
      setSnackbar({ open: true, message, severity: "success" });
      setEmail("");
    } else if (error) {
      setSnackbar({ open: true, message: error, severity: "error" });
      dispatch(clearError());
    }
  }, [message, error, dispatch]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <ForgotPasswordContainer maxWidth="lg">
      <ForgotPasswordWrapper>
        <ForgotPasswordImage />
        <ForgotPasswordFormSection>
          <ForgotpasswordTitle variant="h5">
            Forgot<span> Password</span>
          </ForgotpasswordTitle>
          <ForgotPasswordForm onSubmit={submitHandler}>
            <ForgotPasswordInput
              label="Enter Email"
              variant="outlined"
              type="text"
              id="email_filed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomButton
              label="Send Email"
              id="forgot_password_button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
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
          </ForgotPasswordForm>
        </ForgotPasswordFormSection>
      </ForgotPasswordWrapper>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleCloseSnackbar}
      />
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;