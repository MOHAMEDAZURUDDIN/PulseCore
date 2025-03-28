import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";

const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
  cursor: "pointer",
  display: "none",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const CustomDrawer = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const categories = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Products", icon: <CategoryIcon />, path: "#popular-sales" },
    {
      text: "Services",
      icon: <MiscellaneousServicesIcon />,
      path: "#services",
    },
    { text: "About Us", icon: <ContactsIcon />, path: "#about-us" },
  ];
  const handleNavClick = (path) => {
    if (path.startsWith("#")) {
      const sectionId = path.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(path);
      }
    }
  };
  return (
    <>
      <CustomMenuIcon onClick={() => setOpen(true)} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <List>
            {categories.map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleNavClick(path)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
