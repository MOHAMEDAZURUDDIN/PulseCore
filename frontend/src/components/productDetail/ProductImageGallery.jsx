import { Box } from "@mui/material";
import React from "react";
import { Colors } from "../../themes/index.js";

const ProductImageGallery = ({ images, selectedImage, onImageClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      }}
    >
      {images.length > 1 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Product Image ${index + 1}`}
              sx={{
                width: 64,
                height: 64,
                objectFit: "contain",
                borderRadius: "8px",
                border:
                  index === selectedImage
                    ? `2px solid ${Colors.neonPink}`
                    : `1px solid ${Colors.darkGray}`,
                boxShadow:
                  index === selectedImage
                    ? `0 0 10px ${Colors.neonPink}80`
                    : "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  border: `2px solid ${Colors.neonGreen}`,
                  boxShadow: `0 0 10px ${Colors.neonGreen}80`,
                },
              }}
              onClick={() => onImageClick(index)}
            />
          ))}
        </Box>
      )}
      <Box
        component="img"
        src={images[selectedImage]}
        alt="Main Product"
        sx={{
          width: { xs: "100%", md: "400px" },
          height: "auto",
          borderRadius: "12px",
          border: `1px solid ${Colors.neonGreen}33`,
          boxShadow: `0 0 20px ${Colors.warning}80`,
          transition: "transform 0.4s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: `0 0 30px ${Colors.neonGreen}B3`,
          },
        }}
      />
    </Box>
  );
};

export default ProductImageGallery;
