import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Added for navigation
import BagImg from "../../assets/images/banner/bagbanner1.png";
import WatchBanner from "../../assets/images/banner/WatchBanner2.png";
import ShoesBanner from "../../assets/images/banner/ShoesBanner.png";
import HatsImg from "../../assets/images/banner/WatchBanner1.png";
import SprayBanner from "../../assets/images/banner/moody.png";
import HeroLogo from "../../assets/images/offer/sp.png";
import {
  FlexHeader,
  ImageContainer,
  FlexSlideHeader,
  FlexBanner,
  BannerOverlay,
  ShopButton, // New styled button
} from "../../styles/firstFlex/index.js";

const bannerImages = [
  {
    src: BagImg,
    alt: "Trendy Bags",
    title: "Explore Stylish Bags",
    path: "/products/bags",
  },
  {
    src: WatchBanner,
    alt: "Luxury Watches",
    title: "Timeless Elegance",
    path: "/products/watches",
  },
  {
    src: ShoesBanner,
    alt: "Fashionable Shoes",
    title: "Step Up Your Style",
    path: "/products/shoes",
  },
  {
    src: HatsImg,
    alt: "Cool Hats",
    title: "Top Off Your Look",
    path: "/products/hats",
  },
  {
    src: SprayBanner,
    alt: "Moody Spray",
    title: "Scent of Adventure",
    path: "/products/sprays",
  },
];

const SliderSettings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  pauseOnHover: true,
  fade: true,
};

const FirstFlex = React.memo(() => {
  const navigate = useNavigate(); // For button navigation

  return (
    <FlexHeader>
      <ImageContainer src={HeroLogo} alt="Special Offer Logo" />
      <FlexSlideHeader>
        <Slider {...SliderSettings}>
          {bannerImages.map((img, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <FlexBanner src={img.src} alt={img.alt} />
              <BannerOverlay>
                <Typography variant="h3" component="h1">
                  {img.title}
                </Typography>
                <Typography variant="subtitle1">
                  Discover the Latest Trends
                </Typography>
                <ShopButton>Shop Now</ShopButton>
              </BannerOverlay>
            </Box>
          ))}
        </Slider>
      </FlexSlideHeader>
    </FlexHeader>
  );
});

export default FirstFlex;
