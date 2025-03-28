import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/cart`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`/api/v1/cart/add`, {
        productId,
        quantity,
      });
      dispatch(fetchCart());
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to add item to cart"
      );
    }
  }
);
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItemQTY",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/cart/update", {
        productId,
        quantity,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to update item quantity"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/v1/cart/remove", {
        data: { productId },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to remove from cart"
      );
    }
  }
);

export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (shippingInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/cart/shipping", shippingInfo);
      return {
        shippingInfo: data.cart.shippingInfo,
        message: data.message,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/v1/cart/clear");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const processCodPayment = createAsyncThunk(
  "cart/processCodPayment",
  async (order, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("/api/v1/order/new", order);
      if (response.data.success) {
        dispatch(clearCart()); // Clear cart after successful order
        return response.data.order;
      }
      throw new Error("Order creation failed");
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
