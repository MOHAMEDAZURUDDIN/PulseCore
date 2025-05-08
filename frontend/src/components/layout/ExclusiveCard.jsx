import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { shallowEqual, useSelector } from "react-redux";
import {
  ExclusiveContainer,
  ExclusivePriceTag,
  ExclusiveProductCard,
  ExclusiveProductImage,
  ExclusiveProductName,
  ExclusiveSliderWrapper,
  ExclusiveTitle,
} from "../../styles/ExclusiveOffers/index.js";

const sliderSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const ExclusiveCard = () => {
  const products = useSelector(
    (state) => state.productsState.products,
    shallowEqual
  );
  const filteredProducts = useMemo(() => products.slice(0, 19), [products]);

  return (
    <ExclusiveContainer>
      <ExclusiveTitle variant="h4">
        Exclusive <span>Offers</span>
      </ExclusiveTitle>
      <ExclusiveSliderWrapper>
        <Slider {...sliderSettings}>
          {filteredProducts.map((product) => (
            <ExclusiveProductCard key={product._id}>
              <ExclusiveProductImage
                src={product.images[0]}
                alt={product.name}
              />
              <ExclusiveProductName>{product.name}</ExclusiveProductName>
              <ExclusivePriceTag>${product.price}</ExclusivePriceTag>
            </ExclusiveProductCard>
          ))}
        </Slider>
      </ExclusiveSliderWrapper>
    </ExclusiveContainer>
  );
};

export default ExclusiveCard;
