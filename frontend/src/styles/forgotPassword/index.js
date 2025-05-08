import { Box, Container, styled, TextField, Typography } from "@mui/material";
import { Colors } from "../../themes/index.js";
import forgotImg from "../../assets/images/auth/Forgotpassword.png";

export const ForgotPasswordContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10), 
  padding: theme.spacing(8),
  background: Colors.deepBlack,
  minHeight: "100vh",
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
}));

export const ForgotPasswordWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  borderRadius: "16px",
  boxShadow: `0 0 25px ${Colors.neonPink}4D`,
  overflow: "hidden",
  background: `${Colors.darkGray}E6`,
  border: `1px solid ${Colors.neonGreen}33`,
  backdropFilter: "blur(10px)",
  zIndex: 1,
  "&:hover": {
    boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const ForgotPasswordImage = styled("img")(({ theme }) => ({
  flex: 1,
  backgroundImage: `url(${forgotImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "block",
  height: "60vh",
  boxShadow: `0 0 15px ${Colors.neonGreen}80`,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const ForgotPasswordFormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: Colors.deepBlack,
  padding: theme.spacing(4),
}));

export const ForgotpasswordTitle = styled(Typography)({
  fontWeight: 900,
  textAlign: "center",
  fontFamily: "'Orbitron', sans-serif",
  background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: `0 0 10px ${Colors.neonGreen}80`,
  "& span": {
    color: Colors.orangered,
  },
});

export const ForgotPasswordForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(2),
}));

export const ForgotPasswordInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1, 0),
  "& .MuiOutlinedInput-root": {
    background: `${Colors.deepBlack}E6`,
    color: Colors.white,
    fontFamily: "'Orbitron', sans-serif",
    "& fieldset": { borderColor: Colors.neonGreen },
    "&:hover fieldset": { borderColor: Colors.neonPink },
    "&.Mui-focused fieldset": {
      borderColor: Colors.orangered,
      boxShadow: `0 0 10px ${Colors.neonPink}`,
    },
  },
  "& .MuiInputLabel-root": { color: Colors.neonGreen },
  "& .MuiInputLabel-root.Mui-focused": { color: Colors.orangered },
}));