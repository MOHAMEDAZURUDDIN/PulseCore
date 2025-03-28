import { Box, Paper, styled, Typography } from "@mui/material";
import { Colors } from "../../themes";

export const ServiceContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 4),
  background: `linear-gradient(135deg, ${Colors.secondary}10 0%, ${Colors.dark}80 100%)`,
  color: Colors.inverse,
  borderRadius: "24px",
  boxShadow: `0 12px 40px rgba(0, 0, 0, 0.2)`,
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(6, 2),
  },
}));
export const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: "2.5rem",
  textAlign: "center",
  fontFamily: "'Orbitron', sans-serif",
  padding: "20px 0",
  background: `linear-gradient(90deg, ${Colors.black}, ${Colors.neonPink})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: `0 0 20px ${Colors.inverse}80`,
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

export const ServiceGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "repeat(3, 1fr)",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const ServiceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: "16px",
  background: `linear-gradient(135deg, ${Colors.dark} 0%, ${Colors.shaft}80 100%)`,
  boxShadow: `0 6px 15px rgba(0, 0, 0, 0.3)`,
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: `0 12px 30px ${Colors.orangered}60`,
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: Colors.orangered,
  backgroundColor: `${Colors.inverse}20`,
  borderRadius: "50%",
  width: "80px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  transition: "transform 0.4s ease",
  "&:hover": {
    transform: "rotate(15deg)",
  },
}));
