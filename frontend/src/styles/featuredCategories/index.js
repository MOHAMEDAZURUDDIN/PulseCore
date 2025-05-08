import { Box, IconButton, styled, Typography } from "@mui/material";
import { Colors } from "../../themes";

export const FeaturedContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "40px 20px",
  background: Colors.deepBlack,
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: `linear-gradient(135deg, ${Colors.seagreen} 0%, ${Colors.orangered} 100%)`,
    clipPath: "polygon(100% 60%, 100% 0, 90% 0, 0 30%)",
    opacity: 0.9,
    zIndex: 0,
    animation: "pulse 4s infinite alternate",
    "@keyframes pulse": {
      "0%": { opacity: 0.7, transform: "scale(1)" },
      "100%": { opacity: 1, transform: "scale(1.05)" },
    },
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: "2.5rem",
  textAlign: "center",
  fontFamily: "'Orbitron', sans-serif",
  padding: "20px 0",
  background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: `0 0 20px ${Colors.neonGreen}80`,
  textTransform: "uppercase",
  letterSpacing: "2px",
  zIndex: 1,
  position: "relative",
  "& span": {
    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.seagreen})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.8rem",
  },
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "30px",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  zIndex: 1,
  position: "relative",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "20px",
  },
}));

export const FixedOfferImage = styled("img")(({ theme }) => ({
  width: "25%",
  maxWidth: "250px",
  borderRadius: "12px",
  objectFit: "cover",
  boxShadow: `0 0 20px ${Colors.neonGreen}80`,
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "translateY(-10px) scale(1.05)",
    boxShadow: `0 0 30px ${Colors.warning}B3`,
  },
  [theme.breakpoints.down("md")]: {
    width: "80%",
    maxWidth: "300px",
  },
}));

export const ProductsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  width: "75%",
  padding: "20px",
  background: `${Colors.darkGray}E6`,
  borderRadius: "16px",
  border: `1px solid ${Colors.neonGreen}33`,
  backdropFilter: "blur(10px)",
  boxShadow: `0 0 25px ${Colors.warning}4D`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
  },
  // Ensure the title spans the full width of the grid
  "& > *:first-child": {
    gridColumn: "1 / -1", // Makes the title span all columns
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  },
}));

export const ProductCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px",
  borderRadius: "12px",
  background: Colors.semiDark,
  boxShadow: `0 0 15px ${Colors.neonGreen}80`,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `0 0 25px ${Colors.warning}B3`,
  },
}));

export const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "140px",
  objectFit: "contain",
  borderRadius: "10px",
  backgroundColor: Colors.deepBlack,
  boxShadow: `0 0 10px ${Colors.warning}80`,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "rotate(5deg)",
  },
}));

export const ViewButton = styled(IconButton)(({ theme }) => ({
  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
  color: Colors.white,
  padding: "8px",
  borderRadius: "50%",
  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
    transform: "rotate(20deg) scale(1.1)",
    boxShadow: `0 0 15px ${Colors.neonPink}B3`,
  },
}));
