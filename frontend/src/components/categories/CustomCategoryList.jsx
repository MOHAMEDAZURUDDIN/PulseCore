import React, { useState } from "react";
import { AccessoriesListContainer } from "../../styles/categories";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { Colors } from "../../themes";
import { GiWatch } from "react-icons/gi";
import { PiSunglassesDuotone } from "react-icons/pi";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaRing } from "react-icons/fa";
import { FaRedhat } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";

const MenuOptions = [
  {
    item: "Watches",
    icon: <GiWatch size={24} color={Colors.neonGreen} />,
    data: ["Smart Watch", "Analog Watch", "Digital Watch"],
  },
  {
    item: "Bags",
    icon: <BsFillHandbagFill size={24} color={Colors.shaft} />,
    data: ["Backpack", "Tote Bag", "Handbag"],
  },
  {
    item: "Hats",
    icon: <FaRedhat size={24} color={Colors.warning} />,
    data: ["Baseball Cap", "Fedora", "Beanie"],
  },
  {
    item: "Jewelry",
    icon: <FaRing size={24} color={Colors.midnightmonkey} />,
    data: ["Necklace", "Bracelet", "Earrings"],
  },

  {
    item: "Footwear",
    icon: <GiRunningShoe size={24} color={Colors.shaft} />,
    data: ["Sneakers", "Boots", "Sandals"],
  },
  {
    item: "Sunglasses",
    icon: <PiSunglassesDuotone size={24} color={Colors.success} />,
    data: ["Polarized", "Aviator", "Sports"],
  },
];

const CustomCategoryList = () => {
  const [anchorE1, setAnchorE1] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  const open = Boolean(anchorE1);

  const handleToggleMenu = (event, data) => {
    setAnchorE1(event.currentTarget);
    setCurrentData(data);
  };
  const handleClose = () => {
    setAnchorE1(null);
    setCurrentData([]);
  };

  return (
    <AccessoriesListContainer
      sx={{ flex: "0 0 80%", justifyContent: "space-evenly" }}
    >
      {MenuOptions.map((accessory, i) => (
        <Box key={i} sx={{ marginBottom: "1rem" }}>
          <Button
            aria-controls={open ? `menu-${i}` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event) => handleToggleMenu(event, accessory.data)}
            variant="outlined"
            startIcon={accessory.icon}
            sx={{
              backgroundColor: Colors.dark,
              color: Colors.white,
              borderColor: Colors.midnightmonkey,
              "&:hover": {
                backgroundColor: Colors.orangered,
              },
            }}
          >
            {accessory.item}
          </Button>
          <Menu
            id={`menu-${i}`}
            anchorEl={anchorE1}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": `button-${i}`,
            }}
            sx={{ mt: 1 }}
          >
            {currentData.map((dataItem, i) => (
              <MenuItem
                key={i}
                onClick={handleClose}
                sx={{ fontWeight: 500, fontFamily: "cursive" }}
              >
                {dataItem}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ))}
    </AccessoriesListContainer>
  );
};

export default CustomCategoryList;
