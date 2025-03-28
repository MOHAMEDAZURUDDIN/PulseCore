import { Box, Typography } from "@mui/material";
import React from "react";
import {
  FaClock,
  FaWallet,
  FaGlasses,
  FaLightbulb,
  FaShoppingCart,
  FaGift,
} from "react-icons/fa";
import { Colors } from "../../themes";
import {
  IconWrapper,
  ServiceCard,
  ServiceContainer,
  ServiceGrid,
  ServiceTitle,
} from "../../styles/services";

const services = [
  {
    title: "Elegant Watches",
    description: "Timeless watches to redefine your style.",
    icon: <FaClock size={40} />,
  },
  {
    title: "Premium Wallets",
    description: "Luxury leather wallets for every occasion.",
    icon: <FaWallet size={40} />,
  },
  {
    title: "Stylish Belts",
    description: "Sleek, durable belts with a touch of elegance.",
    icon: <FaGlasses size={40} />,
  },
  {
    title: "Innovative Accessories",
    description: "Modern designs crafted for daily life.",
    icon: <FaLightbulb size={40} />,
  },
  {
    title: "Exclusive Offers",
    description: "Special deals you won’t want to miss.",
    icon: <FaShoppingCart size={40} />,
  },
  {
    title: "Perfect Gifting",
    description: "Ideal gifts for your loved ones.",
    icon: <FaGift size={40} />,
  },
];

const Service = () => {
  return (
    <ServiceContainer>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <ServiceTitle variant="h4">
          Our <span style={{ color: Colors.orangered }}>Services</span>
        </ServiceTitle>
        <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", }}>
          Discover our exclusive range of men’s accessories designed to elevate
          your style.
        </Typography>
      </Box>
      <ServiceGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <IconWrapper>{service.icon}</IconWrapper>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
                fontFamily: "'Orbitron', sans-serif",
                mb: 1,
              }}
            >
              {service.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: Colors.dove_gray,
              }}
            >
              {service.description}
            </Typography>
          </ServiceCard>
        ))}
      </ServiceGrid>
    </ServiceContainer>
  );
};

export default Service;
