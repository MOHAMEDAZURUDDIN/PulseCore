import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSnackbar from "../../utils/CustomSnackbar";
import CustomButton from "../../utils/CustomButton";
import {
  ForgotPasswordLink,
  LinksContainer,
  LoginContainer,
  LoginForm,
  LoginFormSection,
  LoginImage,
  LoginInput,
  LoginTitle,
  LoginWrapper,
  NewUserLink,
} from "../../styles/login";
import { loginUser } from "../../redux/actions/userActions";
import { clearError } from "../../redux/slices/authSlice";
import { Colors } from "../../themes/index.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => ({
      loading: state.authState.loading,
      isAuthenticated: state.authState.isAuthenticated,
      error: state.authState.error,
    }),
    shallowEqual
  );

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginUser({ email, password }));
    },
    [dispatch, email, password]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    } else if (error) {
      setSnackbar({ open: true, message: error, severity: "error" });
      dispatch(clearError());
    }
  }, [isAuthenticated, error, dispatch, navigate, redirect]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <LoginContainer maxWidth="lg">
      <LoginWrapper>
        <LoginImage />
        <LoginFormSection>
          <LoginTitle variant="h5">
            L<span>og</span>in
          </LoginTitle>
          <LoginForm onSubmit={submitHandler}>
            <LoginInput
              label="Email"
              variant="outlined"
              type="email"
              id="email_field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoginInput
              label="Password"
              type="password"
              variant="outlined"
              id="password_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomButton
              label={loading ? "Logging..." : "LOGIN"}
              fullWidth
              disabled={loading}
              type="submit"
              id="login_button"
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
          </LoginForm>
          <LinksContainer>
            <ForgotPasswordLink href="/password/forgot" underline="hover">
              Forgot Password?
            </ForgotPasswordLink>
            <NewUserLink href="/register" underline="none">
              New User? Create an account
            </NewUserLink>
          </LinksContainer>
        </LoginFormSection>
      </LoginWrapper>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleCloseSnackbar}
      />
    </LoginContainer>
  );
};

export default Login;
