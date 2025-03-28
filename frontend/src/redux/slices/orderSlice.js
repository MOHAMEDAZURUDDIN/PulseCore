import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getOrderDetail,
  getStripeApiKey,
  myOrders,
  processPayment,
} from "../actions/orderActions";

const initialState = {
  orderDetail: {},
  userOrders: [],
  loading: false,
  error: null,
  isOrderCreated: false,
  stripeApiKey: null,
  paymentStatus: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOrderCreated: (state) => {
      state.isOrderCreated = false;
    },
    resetPaymentStatus: (state) => {
      state.paymentStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload.order;
        state.isOrderCreated = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Create Order Failed:", action.payload);
      });
    builder
      .addCase(getStripeApiKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStripeApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.stripeApiKey = action.payload;
      })
      .addCase(getStripeApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.paymentStatus = "pending";
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = "success";
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload.orders;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload.order;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearOrderCreated, resetPaymentStatus } =
  orderSlice.actions;
export default orderSlice.reducer;
