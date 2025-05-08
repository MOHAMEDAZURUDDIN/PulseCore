import { Box, IconButton, styled, Typography } from "@mui/material";
import { Colors } from "../../themes";

export const NextArrowIconBtn = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: theme.spacing(2),
  transform: "translateY(-50%)",
  zIndex: 10,
  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
  color: Colors.white,
  padding: theme.spacing(1.5),
  borderRadius: "50%",
  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
    transform: "translateY(-50%) scale(1.1)",
    boxShadow: `0 0 15px ${Colors.neonPink}B3`,
  },
}));

export const PrevArrowIconBtn = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: theme.spacing(2),
  transform: "translateY(-50%)",
  zIndex: 10,
  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
  color: Colors.white,
  padding: theme.spacing(1.5),
  borderRadius: "50%",
  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
    transform: "translateY(-50%) scale(1.1)",
    boxShadow: `0 0 15px ${Colors.neonPink}B3`,
  },
}));

export const TrendingBoxContainer = styled(Box)(({ theme }) => ({
  width: "100%",
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
    clipPath: "polygon(80% 0, 100% 0, 10% 60%, 0 0)",
    opacity: 0.9,
    zIndex: 0,
    animation: "pulse 4s infinite alternate",
    "@keyframes pulse": {
      "0%": { opacity: 0.7, transform: "scale(1)" },
      "100%": { opacity: 1, transform: "scale(1.05)" },
    },
  },
  "& .slick-track": {
    display: "flex",
    alignItems: "center",
  },
  "& .slick-slide": {
    padding: theme.spacing(1),
  },
}));

export const TrendingTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  textAlign: "center",
  fontFamily: "'Orbitron', sans-serif",
  fontSize: "2.5rem",
  marginBottom: theme.spacing(3),
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

export const TrendingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: theme.spacing(2),
  borderRadius: "16px",
  background: Colors.semiDark,
  boxShadow: `0 0 15px ${Colors.neonGreen}80`,
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `0 0 25px ${Colors.neonPink}B3`,
  },
}));

export const TrendingImageBox = styled("img")(({ theme }) => ({
  width: "80%",
  maxHeight: "250px",
  objectFit: "contain",
  borderRadius: "12px",
  margin: theme.spacing(3),
  backgroundColor: Colors.deepBlack,
  boxShadow: `0 0 10px ${Colors.neonPink}80`,
  transition: "transform 0.4s ease",
  "&:hover": {
    transform: "rotate(5deg) scale(1.08)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    maxHeight: "200px",
  },
}));

export const TrendingIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
  color: Colors.white,
  padding: theme.spacing(1.2),
  borderRadius: "50%",
  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
  opacity: 0,
  transition: "opacity 0.3s ease, transform 0.3s ease",
  "&:hover": {
    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
    transform: "translate(-50%, -50%) scale(1.1)",
    boxShadow: `0 0 15px ${Colors.neonPink}B3`,
  },
  ".slick-slide:hover &": {
    opacity: 1,
  },
}));
