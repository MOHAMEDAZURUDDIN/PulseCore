import React, { useCallback, memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowForwardIos, ArrowBackIos, Visibility } from "@mui/icons-material";
import { shallowEqual } from "react-redux";
import {
  NextArrowIconBtn,
  PrevArrowIconBtn,
  TrendingBox,
  TrendingBoxContainer,
  TrendingIconButton,
  TrendingImageBox,
  TrendingTitle,
} from "../../styles/trendingProducts";

const NextArrow = memo(({ onClick }) => (
  <NextArrowIconBtn onClick={onClick}>
    <ArrowForwardIos />
  </NextArrowIconBtn>
));

const PrevArrow = memo(({ onClick }) => (
  <PrevArrowIconBtn onClick={onClick}>
    <ArrowBackIos />
  </PrevArrowIconBtn>
));

const sliderSettings = {
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const TrendingProduct = () => {
  const navigate = useNavigate();
  const products = useSelector(
    (state) => state.productsState.products,
    shallowEqual
  );
  const filteredProducts = useMemo(() => products.slice(13, 19), [products]);

  const handleClick = useCallback(
    (id) => navigate(`/products/${id}`),
    [navigate]
  );

  return (
    <TrendingBoxContainer>
      <TrendingTitle variant="h4">
        Trending <span>Products</span>
      </TrendingTitle>
      <Slider {...sliderSettings}>
        {filteredProducts.map((product) => (
          <TrendingBox key={product._id}>
            <TrendingImageBox src={product.images[0]} alt={product.name} />
            <TrendingIconButton onClick={() => handleClick(product._id)}>
              <Visibility />
            </TrendingIconButton>
          </TrendingBox>
        ))}
      </Slider>
    </TrendingBoxContainer>
  );
};

export default TrendingProduct;
