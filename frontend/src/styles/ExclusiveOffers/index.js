import { Box, styled, Typography } from "@mui/material";
import { Colors } from "../../themes";

export const ExclusiveContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
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
    clipPath: "polygon(0 0, 50% 0, 50% 170%, 0 10%)",
    opacity: 0.9,
    zIndex: 0,
    animation: "pulse 4s infinite alternate",
    "@keyframes pulse": {
      "0%": { opacity: 0.7, transform: "scale(1)" },
      "100%": { opacity: 1, transform: "scale(1.05)" },
    },
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const ExclusiveTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  textAlign: "center",
  fontFamily: "'Orbitron', sans-serif",
  fontSize: "2.5rem",
  padding: theme.spacing(2),
  textTransform: "uppercase",
  letterSpacing: "2px",
  background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: `0 0 20px ${Colors.neonGreen}80`,
  zIndex: 1,
  position: "relative",
  "& span": {
    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.seagreen})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}));

export const ExclusiveSliderWrapper = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  maxWidth: "95%",
  paddingTop: theme.spacing(3),
  zIndex: 1,
  "& .slick-dots li button:before": {
    fontSize: "12px",
    color: Colors.neonGreen,
    opacity: 0.5,
  },
  "& .slick-dots li.slick-active button:before": {
    color: Colors.neonPink,
    opacity: 1,
  },
}));

export const ExclusiveProductCard = styled(Box)(({ theme }) => ({
  background: Colors.semiDark,
  borderRadius: "16px",
  boxShadow: `0 0 15px ${Colors.neonGreen}80`,
  padding: theme.spacing(2),
  textAlign: "center",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `0 0 25px ${Colors.neonPink}B3`,
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

export const ExclusiveProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "180px",
  objectFit: "contain",
  borderRadius: "12px",
  marginBottom: theme.spacing(1.5),
  backgroundColor: Colors.deepBlack,
  boxShadow: `0 0 10px ${Colors.neonPink}80`,
  transition: "transform 0.4s ease",
  "&:hover": {
    transform: " scale(1.02)",
  },
  [theme.breakpoints.down("md")]: {
    height: "150px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "120px",
  },
}));

export const ExclusiveProductName = styled(Typography)(({ theme }) => ({
  color: Colors.white,
  fontSize: "1.2rem",
  fontFamily: "'Orbitron', sans-serif",
  fontWeight: 600,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

export const ExclusivePriceTag = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
  color: Colors.white,
  width: "80px",
  margin: `${theme.spacing(1)} auto 0`,
  borderRadius: "20px",
  padding: theme.spacing(0.8, 1),
  textAlign: "center",
  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
  transition: "transform 0.3s ease, background 0.3s ease",
  fontFamily: "'Orbitron', sans-serif",
  "&:hover": {
    transform: "scale(1.1)",
    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
    boxShadow: `0 0 15px ${Colors.neonPink}B3`,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    width: "70px",
    padding: theme.spacing(0.6, 1),
  },
}));
