import { Box, Button, styled } from "@mui/material";
import { Colors } from "../../themes";

export const CategoryBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(3),
  marginTop: "100px",
  borderRadius: "16px",
  background: `linear-gradient(135deg, ${Colors.white} 0%, ${Colors.shaft}10 100%)`,
  boxShadow: `0 8px 20px rgba(0, 0, 0, 0.15)`,
  overflow: "hidden",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: theme.spacing(2),
    marginTop: "60px",
  },
}));

export const CategoryBtn = styled(Button)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  fontSize: "1rem",
  padding: theme.spacing(1, 3),
  backgroundColor: Colors.dark,
  color: Colors.muted,
  borderRadius: "50px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  boxShadow: `0 4px 12px ${Colors.dark}80`,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: Colors.orangered,
    color: Colors.white,
    transform: "scale(1.05)",
    boxShadow: `0 6px 18px ${Colors.orangered}99`,
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const AccessoriesListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  padding: theme.spacing(2, 0),
  flexWrap: "wrap", 
  justifyContent: "center",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    justifyContent: "space-evenly",
  },
  [theme.breakpoints.down("md")]: {
    overflowX: "auto",
    flexWrap: "nowrap", 
    "&::-webkit-scrollbar": {
      height: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: Colors.orangered,
      borderRadius: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: `${Colors.shaft}50`,
    },
  },
}));
