import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Container, Typography } from "@mui/material";
import { Colors } from "../../themes/index.js";
import {
  TopBannerContainer,
  FeatureBox,
  FeatureIcon,
} from "../../styles/TopBanner/index.js";

const features = [
  {
    icon: (
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: Colors.inverse }}
      >
        2
      </Typography>
    ),
    text: "Years Warranty",
  },
  {
    icon: <LocalShippingIcon sx={{ color: Colors.warning, fontSize: 32 }} />,
    text: "Free Shipping",
  },
  {
    icon: <RefreshIcon sx={{ color: Colors.orangered, fontSize: 32 }} />,
    text: "12-Day Returns",
  },
];

const TopBanner = () => {
  return (
    <TopBannerContainer>
      <Container maxWidth="lg">
        <div className="features-container">
          {features.map((feature, index) => (
            <FeatureBox key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "600",
                  fontFamily: "'Orbitron', sans-serif",
                  color: Colors.shaft,
                }}
              >
                {feature.text}
              </Typography>
            </FeatureBox>
          ))}
        </div>
      </Container>
    </TopBannerContainer>
  );
};

export default TopBanner;
