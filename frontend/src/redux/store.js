import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/CartSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";

const reducer = combineReducers({
  authState: authReducer,
  productsState: productsReducer,
  productState: productReducer,
  cartState: cartReducer,
  orderState: orderReducer,
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;
