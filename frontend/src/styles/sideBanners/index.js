import { Box, styled } from "@mui/material";
import { Colors } from "../../themes";

export const SideBannerBox = styled(Box)(({ theme }) => ({
  flex: "0 0 20%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  position: "sticky",
  top: "50px",
  maxHeight: "calc(100vh - 40px)",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const SideBannerImage = styled("img")({
  width: "100%",
  height: "100%",
  borderRadius: "12px",
  objectFit: "cover",
  boxShadow: `0 6px 15px ${Colors.warning}80`,
  transition: "transform 0.4s ease, opacity 0.4s ease",
  "&:hover": {
    transform: "scale(1.05)",
    opacity: 0.9,
  },
});
