import { Box, styled } from "@mui/material";
import { Colors } from "../../themes";

export const AboutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(8, 12),
  minHeight: "80vh",
  background: Colors.deepBlack,
  overflow: "hidden",
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: `linear-gradient(135deg, ${Colors.seagreen} 0%, ${Colors.orangered} 100%)`,
    clipPath: "polygon(10% 0, 100% 0, 10% 60%, 0 100%)",
    opacity: 0.9,
    zIndex: 0,
    animation: "pulse 4s infinite alternate",
    "@keyframes pulse": {
      "0%": { opacity: 0.7, transform: "scale(1)" },
      "100%": { opacity: 1, transform: "scale(1.05)" },
    },
  },
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(6, 8),
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: "55%",
  display: "flex",
  flexDirection: "column",
  marginTop:26,
  gap: theme.spacing(2.5),
  background: `${Colors.darkGray}E6`,
  borderRadius: "16px",
  border: `1px solid ${Colors.neonGreen}33`,
  backdropFilter: "blur(10px)",
  boxShadow: `0 0 25px ${Colors.neonPink}4D`,
  padding: theme.spacing(4),
  zIndex: 1,
  "& h4": {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 900,
    fontSize: "2.8rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    background: `linear-gradient(90deg, ${Colors.orangered}, ${Colors.neonPink})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: `0 0 20px ${Colors.neonGreen}80`,
    "& span": {
      background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  "& h5": {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 700,
    fontSize: "1.8rem",
    color: Colors.white,
    marginBottom: theme.spacing(1),
  },
  "& p": {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: Colors.neonGreen,
  },
  "&:hover": {
    boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "60%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    "& h4": { fontSize: "2rem" },
    "& h5": { fontSize: "1.5rem" },
    "& p": { fontSize: "1rem" },
  },
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(4),
  },
}));

export const AboutImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  borderRadius: "16px",
  boxShadow: `0 0 20px ${Colors.neonPink}80`,
  transition: "transform 0.4s ease",
  objectFit: "cover",
  "&:hover": {
    transform: " scale(1.06)",
    boxShadow: `0 0 30px ${Colors.neonGreen}B3`,
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "450px",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "300px",
  },
}));
