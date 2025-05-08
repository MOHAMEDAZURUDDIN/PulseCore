import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Network Error");
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Network Error");
    }
  }
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Network Error");
    }
  }
);
