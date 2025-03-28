import { Box } from "@mui/material";
import React from "react";
import { Colors } from "../../themes";
import { CategoryBoxContainer } from "../../styles/categories";
import AllCategories from "./AllCategories";
import CustomCategoryList from "./CustomCategoryList";

const CategoryList = () => {
  return (
    <CategoryBoxContainer>
      <Box
        sx={{
          flex: "0 0 20%",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        <AllCategories />
      </Box>
      <CustomCategoryList />
    </CategoryBoxContainer>
  );
};

export default CategoryList;
