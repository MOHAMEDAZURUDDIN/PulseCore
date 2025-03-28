import { Box, styled, Typography } from "@mui/material";
import { Colors } from "../../themes/index";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: 10,
  marginBottom: 10,
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const NavHeader = styled(Typography)({
  fontSize: "14px",
  padding: "2px",
  fontWeight: "bold",
  fontFamily: ["cursive"],
  cursor: "pointer",
  "&:hover": {
    color: Colors.warning,
  },
});

export const HeaderLogo = styled("img")(({ theme }) => ({
  cursor: "pointer",
  width: "56px",
  height: "auto",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
    marginRight: "0",
    borderRadius: "50%",
    transform: "rotate(360deg)",
    background: `linear-gradient(135deg, ${Colors.semiDark} 0%, ${Colors.orangered} 100%)`,
  },

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
