import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  clearCart,
  fetchCart,
  processCodPayment,
  removeFromCart,
  saveShippingInfo,
  updateCartItem,
} from "../actions/cartActions";

const initialState = {
  items: [],
  loading: false,
  shippingInfo: {},
  codPaymentStatus: null,
  codPaymentError: null,
  error: null,
  Snackbar: {
    open: false,
    message: "",
    severity: "success",
  },
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCodPaymentStatus(state) {
      state.codPaymentStatus = null;
      state.codPaymentError = null;
    },
    resetSnackbar: (state) => {
      state.Snackbar = {
        open: false,
        message: "",
        severity: "success",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart?.items || [];
        state.shippingInfo = action.payload.cart?.shippingInfo || {};
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Add to Cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.Snackbar = {
          open: true,
          message: action.payload.message,
          severity: "success",
        };
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Cart Item
    builder
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.Snackbar = {
          open: true,
          message: action.payload.message,
          severity: "success",
        };
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Remove from cart
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.Snackbar = {
          open: true,
          message: action.payload.message,
          severity: "success",
        };
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Save Shipping Info
    builder
      .addCase(saveShippingInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveShippingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingInfo = action.payload.shippingInfo || {};
        state.Snackbar = {
          open: true,
          message: action.payload.message,
          severity: "success",
        };
      })
      .addCase(saveShippingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.Snackbar = {
          open: true,
          message: action.payload,
          severity: "error",
        };
      });
    // Clear cart
    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [];
        state.shippingInfo = {};
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Process COD Payment
    builder
      .addCase(processCodPayment.pending, (state) => {
        state.loading = true;
        state.codPaymentStatus = "pending";
        state.codPaymentError = null;
      })
      .addCase(processCodPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.codPaymentStatus = "success";
        state.items = [];
        state.shippingInfo = {};
        state.Snackbar = {
          open: true,
          message: action.payload.message,
          severity: "success",
        };
      })
      .addCase(processCodPayment.rejected, (state, action) => {
        state.loading = false;
        state.codPaymentStatus = "failed";
        state.codPaymentError = action.payload;
      });
  },
});

export const { clearCodPaymentStatus, resetSnackbar } = cartSlice.actions;
export default cartSlice.reducer;
