import {
  Box,
  Container,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "../../themes/index.js";
import LogImag from "../../assets/images/auth/Login.png";

export const LoginContainer = styled(Container)(({ theme }) => ({
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

export const LoginWrapper = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const LoginImage = styled("img")(({ theme }) => ({
  flex: 1,
  backgroundImage: `url(${LogImag})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "block",
  boxShadow: `0 0 15px ${Colors.neonGreen}80`,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const LoginFormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: Colors.deepBlack,
  padding: theme.spacing(4),
}));

export const LoginTitle = styled(Typography)({
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

export const LoginForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(2),
}));

export const LoginInput = styled(TextField)(({ theme }) => ({
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

export const LinksContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: "center",
}));

export const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  color: Colors.neonPink,
  display: "block",
  marginBottom: theme.spacing(1),
  fontFamily: "'Orbitron', sans-serif",
  "&:hover": {
    color: Colors.orangered,
    textShadow: `0 0 10px ${Colors.orangered}80`,
  },
}));

export const NewUserLink = styled(Link)({
  color: Colors.neonGreen,
  fontFamily: "'Orbitron', sans-serif",
  "&:hover": {
    color: Colors.warning,
    textShadow: `0 0 10px ${Colors.warning}80`,
  },
});
