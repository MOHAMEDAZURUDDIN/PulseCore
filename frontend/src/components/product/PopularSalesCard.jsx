import React, { useCallback } from "react";
import { Box, CardContent, IconButton, Rating, Typography } from "@mui/material";
import { ProductCardBox, ProductCardMedia } from "../../styles/products";
import { Colors } from "../../themes";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { resetSnackbar } from "../../redux/slices/CartSlice";
import CustomSnackbar from "../../utils/CustomSnackbar";

const PopularSalesCard = React.memo(({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Snackbar = useSelector(
    (state) => state.cartState.Snackbar,
    shallowEqual
  );
  const {
    id,
    name,
    description,
    ratings,
    numOfReviews,
    price,
    stock,
    images,
    seller,
  } = product;

  const handleClick = useCallback(
    () => navigate(`/products/${product._id}`),
    [navigate, product._id]
  );

  const handleSnackbarClose = useCallback(
    () => dispatch(resetSnackbar()),
    [dispatch]
  );

  return (
    <ProductCardBox>
      <Box sx={{ position: "relative" }}>
        <ProductCardMedia
          component="img"
          image={images[0]}
          alt={`img/item-img/${id}`}
        />
        <IconButton
          onClick={handleClick}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            background: `linear-gradient(90deg, ${Colors.neonGreen}, ${Colors.teal})`,
            color: Colors.white,
            padding: "8px",
            borderRadius: "50%",
            boxShadow: `0 0 10px ${Colors.neonGreen}80`,
            "&:hover": {
              background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
              transform: "rotate(20deg) scale(1.1)",
              boxShadow: `0 0 15px ${Colors.neonPink}B3`,
            },
            transition: "all 0.3s ease",
            zIndex: 1, // Ensure it stays above the image
          }}
        >
          <VisibilityIcon />
        </IconButton>
      </Box>
      <CardContent sx={{ textAlign: "center", color: Colors.white }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            fontFamily: "'Orbitron', sans-serif",
            color: Colors.white,
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: Colors.neonGreen,
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            fontFamily: "'Orbitron', sans-serif",
            background: `linear-gradient(90deg, ${Colors.neonPink}, ${Colors.orangered})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 0 10px ${Colors.neonPink}80`,
          }}
        >
          ${price}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: Colors.neonPink,
            fontFamily: "'Orbitron', sans-serif",
            fontStyle: "italic",
          }}
        >
          By {seller}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, fontFamily: "'Orbitron', sans-serif" }}
        >
          {stock ? (
            <span style={{ color: Colors.neonGreen }}>In Stock</span>
          ) : (
            <span style={{ color: Colors.neonPink }}>Out of Stock</span>
          )}
        </Typography>
        <Rating value={ratings} precision={0.1} readOnly size="small" />
        <Typography
          variant="caption"
          sx={{
            color: Colors.neonGreen,
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          ({numOfReviews} reviews)
        </Typography>
      </CardContent>
      <CustomSnackbar
        open={Snackbar.open}
        message={Snackbar.message}
        severity={Snackbar.severity}
        handleClose={handleSnackbarClose}
      />
    </ProductCardBox>
  );
});

export default PopularSalesCard;