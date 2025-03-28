import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CustomDrawer from "../../utils/CustomDrawer.jsx";
import {
  HeaderContainer,
  HeaderLogo,
  NavHeader,
} from "../../styles/header/index.js";
import HeroLogo from "../../assets/images/accessories/logo2.png";
import { Colors } from "../../themes/index.js";
import CustomButton from "../../utils/CustomButton.jsx";
import { nav_title } from "../../utils/index.jsx";
import { logOutUser } from "../../redux/actions/userActions.js";

const Header = () => {
  const [anchorE1, setAnchorE1] = useState(null);
  const [navState, setNavState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector(
    (state) => ({
      isAuthenticated: state.authState.isAuthenticated,
      user: state.authState.user,
    }),
    shallowEqual
  );
  const cartItems = useSelector((state) => state.cartState.items, shallowEqual);

  const handleNavClick = (path) => {
    if (path.startsWith("#")) {
      const sectionId = path.substring(1); 
      // If not on home page, navigate to "/" first
      if (location.pathname !== "/") {
        navigate(`/#${sectionId}`);        
      } else {
        // Already on home, just scroll
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(path); // For non-hash paths (e.g., "/")
    }
  };
  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logOutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [dispatch, navigate]);

  const handleMenuClick = useCallback((e) => {
    if (anchorE1) {
      setAnchorE1(null);
    } else {
      setAnchorE1(e.currentTarget);
    }
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorE1(null);
  }, []);

  const onNavScroll = useCallback(() => {
    setNavState(window.scrollY > 10);
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      setAnchorE1(null);
    }
  }, [isAuthenticated]);
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, [onNavScroll]);

  return (
    <Box
      sx={{
        backgroundColor: navState ? Colors.teal : Colors.inverse,
        color: navState ? Colors.dove_gray : Colors.muted,
        transition: "background-color 0.3s ease-in-out",
        position: "fixed",
        width: "100%",
        zIndex: 1100,
        top: 0,
      }}
    >
      {/* Top Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
      >
        {/* Left Section */}
        <Box display="flex" alignItems="center" gap={6}>
          <CustomDrawer />
          <Button onClick={() => navigate(-1)}>
            <HeaderLogo src={HeroLogo} alt="hero logo" />
          </Button>

          <HeaderContainer>
            {nav_title.map((item, index) => (
              <NavHeader key={index} onClick={() => handleNavClick(item.path)}>
                {item.display}
              </NavHeader>
            ))}
          </HeaderContainer>
        </Box>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              backgroundColor: navState ? Colors.light : Colors.dove_gray,
              borderRadius: "8px",
              padding: "4px 8px",
            }}
          >
            <InputBase placeholder="Search..." sx={{ width: "100%" }} />
          </Box>

          {/* Icons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Link to={"/cart"}>
              <IconButton
                sx={{
                  background: `linear-gradient(90deg, ${Colors.orangered}, ${Colors.inverse})`,
                  clipPath: " polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
                  color: Colors.dove_gray,
                  padding: "10px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1) rotate(360deg)",
                    backgroundColor: Colors.dark,
                    borderRadius: "50%",
                    color: Colors.orangered,
                    background: `linear-gradient(135deg, ${Colors.info} 0%, ${Colors.inverse} 100%)`,
                  },
                }}
                aria-label="cart"
              >
                <Badge
                  badgeContent={cartItems?.length}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
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
                  <ShoppingCartIcon sx={{ color: Colors.dove_gray }} />
                </Badge>
              </IconButton>
            </Link>
            <Link to={"/myProfile"}>
              <IconButton
                sx={{
                  background: `linear-gradient(90deg, ${Colors.warning}, ${Colors.inverse})`,
                  clipPath: " polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
                  color: Colors.dove_gray,
                  padding: "10px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1) rotate(360deg)",
                    backgroundColor: Colors.dark,
                    borderRadius: "50%",
                    color: Colors.orangered,
                    background: `linear-gradient(135deg, ${Colors.teal} 0%, ${Colors.dragonmonkey} 100%)`,
                  },
                }}
                aria-label="profile"
              >
                <PersonIcon sx={{ color: Colors.dove_gray }} />
              </IconButton>
            </Link>
            <Link to={"/orders"}>
              <IconButton
                sx={{
                  background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.dark})`,
                  clipPath: " polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
                  color: Colors.dove_gray,
                  padding: "10px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1) rotate(360deg)",
                    backgroundColor: Colors.dark,
                    borderRadius: "50%",
                    color: Colors.orangered,
                    background: `linear-gradient(135deg, ${Colors.muted} 0%, ${Colors.inverse} 100%)`,
                  },
                }}
                aria-label="orders"
              >
                <BusinessCenterIcon sx={{ color: Colors.white }} />
              </IconButton>
            </Link>
          </Box>

          {/* Authentication Section */}
          {isAuthenticated ? (
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton onClick={handleMenuClick} aria-label="user menu">
                {user && user.avatar ? (
                  <Avatar
                    src={user?.avatar}
                    alt={user?.name}
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user?.name?.[0]}
                  </Avatar>
                )}
              </IconButton>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "12px", sm: "14px" },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: { xs: "80px", sm: "100px" },
                }}
              >
                {user?.name}
              </Typography>
              <Menu
                anchorEl={anchorE1}
                open={Boolean(anchorE1)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to="/login">
              <CustomButton label={"Login"} />
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
