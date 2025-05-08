import React, { useCallback, useMemo } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Container, Typography } from "@mui/material";
import { Colors } from "../../themes/index.js";
import offer1 from "../../assets/images/accessories/offer2.webp";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FeaturedContainer,
  Title,
  ContentWrapper,
  FixedOfferImage,
  ProductsContainer,
  ProductCard,
  ProductImage,
  ViewButton,
} from "../../styles/featuredCategories/index.js";

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const products = useSelector(
    (state) => state.productsState.products,
    shallowEqual
  );
  const filteredProducts = useMemo(() => products.slice(0, 8), [products]);
  const handleClick = useCallback(
    (id) => navigate(`/products/${id}`),
    [navigate]
  );

  return (
    <FeaturedContainer>
      <Container maxWidth="lg">
        <ContentWrapper>
          <FixedOfferImage src={offer1} alt="Special Offer" />
          <ProductsContainer>
            <Title variant="h4">
              Featured <span>Categories</span>
            </Title>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id}>
                <ProductImage src={product.images[0]} alt={product.name} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "600",
                    fontFamily: "'Orbitron', sans-serif",
                    textAlign: "center",
                    color: Colors.white,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.name}
                </Typography>
                <ViewButton onClick={() => handleClick(product._id)}>
                  <VisibilityIcon />
                </ViewButton>
              </ProductCard>
            ))}
          </ProductsContainer>
        </ContentWrapper>
      </Container>
    </FeaturedContainer>
  );
};

export default FeaturedCategories;
