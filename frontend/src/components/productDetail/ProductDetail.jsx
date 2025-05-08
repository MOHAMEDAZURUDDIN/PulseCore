import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  getProduct,
} from "../../redux/actions/productActions.js";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader.jsx";
import { Box, Button, Typography, Alert } from "@mui/material";
import { Star } from "@mui/icons-material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { Colors } from "../../themes/index.js";
import CustomSnackbar from "../../utils/CustomSnackbar.jsx";
import ProductReview from "./ProductReview";
import { addToCart } from "../../redux/actions/cartActions.js";
import { resetSnackbar } from "../../redux/slices/CartSlice.js";
import { reviewResetSnackbar } from "../../redux/slices/productSlice.js";
import ProductImageGallery from "./ProductImageGallery.jsx";
import ProductQTYSelector from "./ProductQTYSelector.jsx";
import ProductReviewModal from "./ProductReviewModal.jsx";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    product,
    isReviewSubmitted,
    error,
    Snackbar: reviewSnackbarState,
  } = useSelector((state) => state.productState);
  const { user } = useSelector((state) => state.authState);
  const { Snackbar: cartSnackbarState } = useSelector(
    (state) => state.cartState
  );

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.stock === 0) setQuantity(0);
    else if (quantity > product?.stock) setQuantity(product?.stock);
  }, [product?.stock, quantity]);

  const increaseQTY = useCallback(() => {
    setQuantity((prev) => (prev < product?.stock ? prev + 1 : prev));
  }, [product?.stock]);

  const decreaseQTY = useCallback(() => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const handleImageClick = useCallback((index) => setSelectedImage(index), []);

  const handleAddToCart = () => {
    if (!user) return navigate("/login");
    dispatch(addToCart({ productId: product._id, quantity }));
  };

  const handleReviewSubmit = () => {
    if (!rating || !comment.trim()) return;
    dispatch(createReview({ rating, comment, productId: id })).then(() => {
      dispatch(getProduct(id));
      setReviewOpen(false);
      setRating(0);
      setComment("");
    });
  };

  const handleReviewSnackbarClose = () => {
    dispatch(reviewResetSnackbar());
  };
  const handleCartSnackbarClose = () => {
    dispatch(resetSnackbar());
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      setRating(0);
      setComment("");
    }
  }, [isReviewSubmitted]);

  const {
    _id,
    name,
    description,
    price,
    seller,
    stock,
    images,
    ratings,
    numOfReviews,
  } = product || {};

  if (loading) return <Loader />;
  if (error)
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box
      sx={{
        background: Colors.deepBlack,
        color: Colors.white,
        minHeight: "100vh",
        p: 8,
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: `linear-gradient(135deg, ${Colors.seagreen} 0%, ${Colors.orangered} 100%)`,
          clipPath: "polygon(30% 0, 100% 60%, 10% 60%, 0 100%)",
          opacity: 0.9,
          zIndex: 0,
          animation: "pulse 4s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.7, transform: "scale(1)" },
            "100%": { opacity: 1, transform: "scale(1.05)" },
          },
        },
      }}
    >
      {/* Snackbars */}
      <CustomSnackbar
        open={reviewSnackbarState.open}
        message={reviewSnackbarState.message}
        severity={reviewSnackbarState.severity}
        handleClose={handleReviewSnackbarClose}
      />
      <CustomSnackbar
        open={cartSnackbarState.open}
        message={cartSnackbarState.message}
        severity={cartSnackbarState.severity}
        handleClose={handleCartSnackbarClose}
      />

      <Box
        sx={{
          mt: 8,
          zIndex: 1,
          position: "relative",
        }}
      >
        {/* Title */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "2.8rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              background: `linear-gradient(90deg, ${Colors.shaft}, ${Colors.neonPink})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 20px ${Colors.neonGreen}80`,
            }}
          >
            {name}
          </Typography>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: { xs: "center", md: "space-between" },
            background: `${Colors.darkGray}E6`,
            borderRadius: "16px",
            border: `1px solid ${Colors.neonGreen}33`,
            backdropFilter: "blur(10px)",
            boxShadow: `0 0 25px ${Colors.warning}4D`,
            padding: 4,
            "&:hover": {
              boxShadow: `0 0 35px ${Colors.neonGreen}B3`,
            },
          }}
        >
          {/* Image Section */}
          <ProductImageGallery
            images={images || []}
            selectedImage={selectedImage}
            onImageClick={handleImageClick}
          />

          {/* Product Details Section */}
          <Box sx={{ flex: 1, mt: { xs: 4, md: 0 }, maxWidth: "600px" }}>
            <Typography sx={{ fontFamily: "'Orbitron', sans-serif" }}>
              Product # {_id}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Star sx={{ color: Colors.neonGreen }} />
              <Typography
                variant="body2"
                sx={{ ml: 1, fontFamily: "'Orbitron', sans-serif" }}
              >
                {ratings || 0}
                <span style={{ color: Colors.orangered }}>
                  {" "}
                  ({numOfReviews || 0} reviews)
                </span>
              </Typography>
            </Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              $ <span style={{ color: Colors.orangered }}>{price}</span>
            </Typography>

            <ProductQTYSelector
              quantity={quantity}
              onIncrease={increaseQTY}
              onDecrease={decreaseQTY}
              stock={stock}
            />
            <Button
              variant="contained"
              disabled={product?.stock === 0}
              onClick={handleAddToCart}
              sx={{
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
                "&:disabled": {
                  background: Colors.darkGray,
                  cursor: "not-allowed",
                  boxShadow: "none",
                },
                transition: "all 0.3s ease",
                mt: 2,
              }}
            >
              Add To Cart
            </Button>
            <Typography
              variant="body2"
              sx={{ mt: 2, fontFamily: "'Orbitron', sans-serif" }}
            >
              Status: <b>{stock > 0 ? "In Stock" : "Out of Stock"}</b>
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 2, fontFamily: "'Orbitron', sans-serif" }}
            >
              Sold by: <b>{seller}</b>
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 2, fontFamily: "'Orbitron', sans-serif" }}
            >
              Description:
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

            {user ? (
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={() => setReviewOpen(true)}
                  sx={{
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
                  Submit Review
                  <ExpandCircleDownIcon sx={{ ml: 1, fontSize: 26 }} />
                </Button>
                <ProductReviewModal
                  open={reviewOpen}
                  onClose={() => setReviewOpen(false)}
                  onSubmit={handleReviewSubmit}
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                />
              </Box>
            ) : (
              <Typography sx={{ mt: 2, fontFamily: "'Orbitron', sans-serif" }}>
                Please log in to submit a review.
              </Typography>
            )}
          </Box>

          {/* Reviews Section */}
          <Box sx={{ mt: 4 }}>
            {product && product.reviews && product.reviews.length > 0 ? (
              <ProductReview reviews={product.reviews} />
            ) : (
              <Typography sx={{ fontFamily: "'Orbitron', sans-serif" }}>
                No reviews yet.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
