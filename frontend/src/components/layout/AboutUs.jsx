import { Typography } from "@mui/material";
import React from "react";
import AboutImg from "../../assets/images/accessories/about.png";
import { Colors } from "../../themes";
import CustomButton from "../../utils/CustomButton";
import {
  AboutContainer,
  AboutImage,
  ContentBox,
  ImageBox,
} from "../../styles/aboutUs";

const AboutUs = () => {
  return (
    <AboutContainer>
      <ContentBox>
        <Typography variant="h4">
          Who We <span>Are</span>
        </Typography>
        <Typography variant="h5">Redefining Men's Accessories</Typography>
        <Typography variant="body1">
          Welcome to{" "}
          <strong style={{ color: Colors.neonPink }}>Pulse Core</strong>, your
          go-to for premium men's accessories. We curate a collection of
          watches, wallets, belts, and more—designed to elevate your style
          effortlessly.
        </Typography>
        <Typography variant="body1">
          At Pulse Core, our unique designs and unwavering commitment to quality
          ensure you stand out. Discover timeless pieces blending functionality
          with sophistication.
        </Typography>
        <Typography variant="body1">
          Make Pulse Core your partner in redefining your everyday look.
        </Typography>
        <CustomButton label="Explore More" />
      </ContentBox>

      <ImageBox>
        <AboutImage src={AboutImg} alt="Men's Accessories" />
      </ImageBox>
    </AboutContainer>
  );
};

export default AboutUs;
