import {
  Box,
  Button,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Colors } from "../../themes/index.js";

const ProductReviewModal = ({
  open,
  onClose,
  onSubmit,
  rating,
  setRating,
  comment,
  setComment,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          background: `${Colors.darkGray}E6`,
          p: 4,
          borderRadius: "16px",
          border: `1px solid ${Colors.neonGreen}33`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 0 25px ${Colors.warning}4D`,
          width: 400,
          color: Colors.white,
          "&:hover": {
            boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
          },
        }}
      >
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
          Submit Your Review
        </Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          sx={{
            "& .MuiRating-iconFilled": { color: Colors.neonGreen },
            "& .MuiRating-iconEmpty": { color: `${Colors.shaft}80` },
            mb: 2,
          }}
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            mt: 2,
            "& .MuiOutlinedInput-root": {
              background: `${Colors.deepBlack}E6`,
              color: Colors.white,
              fontFamily: "'Orbitron', sans-serif",
              "& fieldset": { borderColor: Colors.neonGreen },
              "&:hover fieldset": { borderColor: Colors.neonPink },
              "&.Mui-focused fieldset": { borderColor: Colors.orangered },
            },
            "& .MuiInputLabel-root": { color: Colors.neonGreen },
            "& .MuiInputLabel-root.Mui-focused": { color: Colors.orangered },
          }}
        />
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            mt: 2,
            background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
            color: Colors.white,
            padding: "10px 20px",
            borderRadius: "12px",
            boxShadow: `0 0 10px ${Colors.neonGreen}80`,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            "&:hover": {
              background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
              boxShadow: `0 0 15px ${Colors.neonPink}B3`,
              transform: "scale(1.05)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductReviewModal;
