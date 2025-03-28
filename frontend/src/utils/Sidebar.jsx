import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Badge,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Colors } from "../themes";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/actions/cartActions";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authState);
  const { items, loading } = useSelector((state) => state.cartState);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  const links = [
    {
      id: 1,
      child: <PersonIcon fontSize="medium" />,
      href: isAuthenticated ? "/myprofile" : "/login",
      label: "Profile",
    },
    {
      id: 3,
      child: (
        <Badge
          badgeContent={items?.length || 0}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: Colors.orangered,
              color: Colors.dove_gray,
              fontSize: "0.75rem",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <ShoppingCartIcon fontSize="medium" />
        </Badge>
      ),
      href: "/cart",
      label: "Cart",
    },
    {
      id: 4,
      child: <BusinessCenterIcon fontSize="medium" />,
      href: "/orders",
      label: "Orders",
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: "35%",
        right: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 20,
        opacity: 1,
      }}
    >
      <List>
        {links.map((link) => (
          <ListItem
            key={link.id}
            disablePadding
            sx={{
              width: "56px",
              height: "56px",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip
              placement="left"
              title={
                <Typography
                  sx={{
                    backgroundColor: Colors.warning,
                    padding: 1,
                    borderRadius: 2,
                    color: Colors.inverse,
                    fontWeight: "bold",
                  }}
                  variant="subtitle2"
                >
                  {link.label}
                </Typography>
              }
              arrow
            >
              <ListItemButton
                href={link.href ? link.href : "/"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(90deg, ${Colors.midnightmonkey}, ${Colors.dark})`,
                  clipPath: " polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
                  color: Colors.dove_gray,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1) rotate(360deg)",
                    marginRight: "0",
                    borderRadius: "50%",                    
                    color: Colors.orangered,
                    background: `linear-gradient(135deg, ${Colors.semiDark} 0%, ${Colors.warning} 100%)`,
                  },
                }}
                aria-label={link.label}
              >
                {link.child}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
