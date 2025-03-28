import { createSlice } from "@reduxjs/toolkit";
import { createReview, getProduct } from "../actions/productActions";

const initialState = {
  loading: false,
  product: {},
  isReviewSubmitted: false,
  Snackbar: {
    open: false,
    message: "",
    severity: "success",
  },
  error: null,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProduct: (state) => {
      state.product = {};
    },
    clearReviewSubmitted: (state) => {
      state.isReviewSubmitted = false;
    },
    reviewResetSnackbar: (state) => {
      state.Snackbar = {
        open: false,
        message: "",
        severity: "success",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.error = null;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.isReviewSubmitted = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.isReviewSubmitted = true;
        state.Snackbar = {
          open: true,
          message: action.payload.message || "Review submitted successfully",
          severity: "success",
        };
        if (state.product && state.product.reviews) {
          state.product.reviews =
            action.payload.product?.reviews || state.product.reviews;
          state.product.numOfReviews =
            action.payload.product?.numOfReviews || state.product.numOfReviews;
          state.product.ratings =
            action.payload.product?.ratings || state.product.ratings;
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.isReviewSubmitted = false;
        state.Snackbar = {
          open: true,
          message: action.payload || "Failed to submit review",
          severity: "error",
        };
        // state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearProduct,
  clearReviewSubmitted,
  reviewResetSnackbar,
} = productSlice.actions;

export default productSlice.reducer;
