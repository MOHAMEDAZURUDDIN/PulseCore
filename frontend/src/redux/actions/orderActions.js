import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post("/api/v1/order/new", order, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

export const getStripeApiKey = createAsyncThunk(
  "payment/getStripeApiKey",
  async (_, { rejectWithValue }) => {
    try {
      const config = { withCredentials: true };
      const { data } = await axios.get("/api/v1/stripeapi", config);
      return data.stripeApiKey;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Stripe API key"
      );
    }
  }
);

export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      return data.client_secret;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to process payment"
      );
    }
  }
);

export const myOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const config = { withCredentials: true };
      const { data } = await axios.get("/api/v1/myorders", config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user orders"
      );
    }
  }
);

export const getOrderDetail = createAsyncThunk(
  "order/getOrderDetail",
  async (id, { rejectWithValue }) => {
    try {
      const config = { withCredentials: true };
      const { data } = await axios.get(`/api/v1/order/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);
