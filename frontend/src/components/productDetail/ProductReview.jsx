import { Box, Divider, Rating, Typography } from "@mui/material";
import React from "react";
import { Colors } from "../../themes/index.js";

const ProductReview = ({ reviews }) => {
  return (
    <Box sx={{ width: "75%", mx: "auto", mt: 4 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: `0 0 10px ${Colors.neonGreen}80`,
        }}
      >
        Other's Reviews
      </Typography>
      <Divider
        sx={{
          my: 2,
          borderColor: `${Colors.neonGreen}33`,
          width: "200px",
          boxShadow: `0 0 5px ${Colors.neonGreen}80`,
        }}
      />
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <Box key={review._id} sx={{ my: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                sx={{
                  "& .MuiRating-iconFilled": { color: Colors.neonGreen },
                  "& .MuiRating-iconEmpty": { color: `${Colors.shaft}80` },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  ml: 2,
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: "bold",
                  color: Colors.shaft,
                }}
              >
                by {review.user ? review.user.name : "Unknown User"}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: Colors.neonGreen,
              }}
            >
              {review.comment}
            </Typography>
            <Divider
              sx={{
                my: 2,
                borderColor: `${Colors.neonGreen}33`,
                width: "200px",
                boxShadow: `0 0 5px ${Colors.neonGreen}80`,
              }}
            />
          </Box>
        ))
      ) : (
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            color: `${Colors.neonGreen}80`,
          }}
        >
          No reviews available.
        </Typography>
      )}
    </Box>
  );
};

export default ProductReview;
