import React, { useState } from "react";
import { CategoryBtn } from "../../styles/categories";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Menu, MenuItem } from "@mui/material";
import { Accessories } from "./index";

const AllCategories = () => {
  const [anchorE1, setAnchorE1] = useState(null);
  const isMenuOpen = Boolean(anchorE1);

  const handleToggleMenu = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  return (
    <Box>
      <CategoryBtn
        aria-controls={isMenuOpen ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        onClick={handleToggleMenu}
        variant="contained"
      >
        <MenuIcon />
        All Categories
        <KeyboardArrowDownIcon />
      </CategoryBtn>

      <Menu
        sx={{ mt: 1 }}
        anchorEl={anchorE1}
        open={isMenuOpen}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "menu-button" }}
      >
        {Accessories.map((option, index) => (
          <MenuItem key={index} sx={{ gap: 2 }} onClick={handleClose}>
            {option.icon}
            {option.item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AllCategories;
