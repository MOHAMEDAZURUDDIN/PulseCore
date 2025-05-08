import { Box, styled } from "@mui/material";
import { Colors } from "../../themes";

export const TopBannerContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: `linear-gradient(90deg, ${Colors.shaft} 0%, ${Colors.dark} 100%)`,
  color: Colors.inverse,
  "& .features-container": {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(2),
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap", // Added for responsiveness
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(1.5),
    },
  },
}));

export const FeatureBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  borderRadius: "12px",
  background: `linear-gradient(135deg, ${Colors.secondary}20, ${Colors.teal}80)`,
  boxShadow: `0 6px 15px rgba(0, 0, 0, 0.2)`,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  width: "30%",
  minWidth: "200px",
  "&:hover": {
    transform: "translateY(-5px) scale(1.03)",
    boxShadow: `0 10px 25px ${Colors.orangered}40`,
    background: `linear-gradient(135deg, ${Colors.secondary}40, ${Colors.orangered}90)`,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    minWidth: "auto",
  },
}));

export const FeatureIcon = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
  backgroundColor: `${Colors.inverse}20`,
  borderRadius: "50%",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "rotate(360deg)",
  },
});
