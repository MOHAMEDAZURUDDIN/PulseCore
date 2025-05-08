import { Box, CardMedia, styled, Typography } from "@mui/material";
import { Colors } from "../../themes";

export const PopularProductContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  background: `${Colors.darkGray}E6`,
  borderRadius: "16px",
  marginTop: 26,
  border: `1px solid ${Colors.neonGreen}33`,
  backdropFilter: "blur(10px)",
  boxShadow: `0 0 25px ${Colors.warning}4D`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: Colors.neonPink,
    borderRadius: "6px",
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1),
  },
}));

export const PopularTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontFamily: "'Orbitron', sans-serif",
  fontSize: "2.5rem",
  marginBottom: theme.spacing(3),
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "2px",
  background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: `0 0 20px ${Colors.neonGreen}80`,
  "& span": {
    background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.seagreen})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.8rem",
  },
}));

export const ProductCardBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "300px",
  borderRadius: "16px",
  background: Colors.semiDark,
  boxShadow: `0 0 15px ${Colors.neonGreen}80`,
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `0 0 25px ${Colors.warning}B3`,
  },
}));

export const ProductCardMedia = styled(CardMedia)(({ theme }) => ({
  height: "200px",
  borderRadius: "16px 16px 0 0",
  objectFit: "contain",
  backgroundColor: Colors.deepBlack,
  boxShadow: `0 0 10px ${Colors.warning}80`,
  transition: "transform 0.4s ease",
  "&:hover": {
    transform: "rotate(5deg) scale(1.05)",
  },
  [theme.breakpoints.down("md")]: {
    height: "160px",
  },
}));
