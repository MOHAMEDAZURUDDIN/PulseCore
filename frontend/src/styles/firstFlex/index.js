import { Box, styled, Typography, Button } from "@mui/material"; // Added Button for ShopButton
import { Colors } from "../../themes";

export const FlexHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  width: "100%",
  maxWidth: "1400px",
  padding: theme.spacing(2),
  background: `linear-gradient(to bottom, ${Colors.shaft}10, ${Colors.dark}20)`,
  borderRadius: "20px",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: theme.spacing(1),
  },
}));

export const ImageContainer = styled("img")(({ theme }) => ({
  flex: "0 0 20%",
  maxWidth: "300px",
  height: "350px",
  objectFit: "contain",
  borderRadius: "16px",
  transition: "transform 0.5s ease, opacity 0.5s ease",
  "&:hover": {
    transform: "scale(1.08) rotate(2deg)",
    opacity: 0.9,
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const FlexSlideHeader = styled(Box)(({ theme }) => ({
  flex: "1",
  width: "100%",
  maxWidth: "1000px",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
  "& .slick-dots li button:before": {
    fontSize: "12px",
    color: Colors.inverse,
    opacity: 0.5,
  },
  "& .slick-dots li.slick-active button:before": {
    color: Colors.orangered,
    opacity: 1,
  },
}));

export const FlexBanner = styled("img")(({ theme }) => ({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: "16px",
  transition: "transform 0.6s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
  [theme.breakpoints.down("lg")]: {
    height: "400px",
  },
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },
}));

export const BannerOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.4)",
  color: Colors.shaft,
  textAlign: "center",
  padding: theme.spacing(4),
  opacity: 0,
  transition: "opacity 0.4s ease",
  "&:hover": {
    opacity: 1,
  },
  "& h3": {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: "2.5rem",
    textShadow: `0 0 10px ${Colors.orangered}`,
    marginBottom: theme.spacing(1),
  },
  "& .MuiTypography-subtitle1": {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: "1.2rem",
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    "& h3": { fontSize: "1.5rem" },
    "& .MuiTypography-subtitle1": { fontSize: "0.9rem" },
  },
}));

export const ShopButton = styled(Button)(({ theme }) => ({
  backgroundColor: Colors.orangered,
  color: Colors.inverse,
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: "1rem",
  padding: theme.spacing(1, 3),
  borderRadius: "30px",
  textTransform: "uppercase",
  boxShadow: `0 4px 15px ${Colors.orangered}80`,
  transition:
    "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: Colors.warning,
    transform: "translateY(-3px) scale(1.05)",
    boxShadow: `0 6px 20px ${Colors.warning}99`,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    padding: theme.spacing(0.8, 2),
  },
}));
