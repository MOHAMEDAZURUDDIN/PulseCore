import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { Colors } from "../../themes/index.js";
import { shallowEqual, useSelector } from "react-redux";
import {
  PopularProductContainer,
  PopularTitle,
} from "../../styles/products/index.js";
import PopularSalesCard from "./PopularSalesCard.jsx";
import SideBanners from "./SideBanners.jsx";

const PopularSales = React.memo(() => {
  const products = useSelector(
    (state) => state.productsState.products,
    shallowEqual
  );
  const filteredProducts = useMemo(() => products.slice(6, 19), [products]);

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 8 },
        display: "flex",
        background: Colors.deepBlack,
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        overflow: "hidden",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: `linear-gradient(135deg, ${Colors.seagreen} 0%, ${Colors.orangered} 100%)`,
          clipPath: "polygon(30% 0, 90% 0, 100% 60%, 0 100%)",
          opacity: 0.9,
          zIndex: 0,
          animation: "pulse 4s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.7, transform: "scale(1)" },
            "100%": { opacity: 1, transform: "scale(1.05)" },
          },
        },
      }}
    >
      {/* Sticky Side Banners */}
      <SideBanners />

      {/* Popular Products Section */}
      <PopularProductContainer>
        <PopularTitle variant="h4">
          Popular <span>Products</span>
        </PopularTitle>

        {/* Product Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2.5,
            justifyItems: "center",
          }}
        >
          {filteredProducts.map((product) => (
            <PopularSalesCard key={product._id} product={product} />
          ))}
        </Box>
      </PopularProductContainer>
    </Box>
  );
});

export default PopularSales;
