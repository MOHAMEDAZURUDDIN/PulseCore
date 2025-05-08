import React from "react";
import {
  PopularCategoryButton,
  PopularCategoryContainer,
} from "../../styles/products";

const PopularCtgryButton = React.memo(({ categories }) => {
  return (
    <PopularCategoryContainer>
      {categories.map((category, index) => (
        <PopularCategoryButton key={index} variant="outlined">
          {category}
        </PopularCategoryButton>
      ))}
    </PopularCategoryContainer>
  );
});

export default PopularCtgryButton;
