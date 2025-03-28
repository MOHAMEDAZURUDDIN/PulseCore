import React, { lazy, Suspense, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "./utils/Sidebar";
import Loader from "./components/layout/Loader";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Lazy-loaded components
const Home = lazy(() => import("./components/home/Home.jsx"));
const Register = lazy(() => import("./components/user/Register.jsx"));
const Login = lazy(() => import("./components/user/Login.jsx"));
const ForgotPassword = lazy(() =>
  import("./components/user/ForgotPassword.jsx")
);
const ResetPassword = lazy(() => import("./components/user/ResetPassword.jsx"));
const Profile = lazy(() => import("./components/user/Profile.jsx"));
const ProductDetail = lazy(() =>
  import("./components/productDetail/ProductDetail.jsx")
);
const Cart = lazy(() => import("./components/cart/Cart.jsx"));
const Service = lazy(() => import("./components/layout/Service.jsx"));
const AboutUs = lazy(() => import("./components/layout/AboutUs.jsx"));
const PopularSales = lazy(() =>
  import("./components/product/PopularSales.jsx")
);
const Shipping = lazy(() => import("./components/cart/Shipping.jsx"));
const ConfirmOrder = lazy(() => import("./components/cart/ConfirmOrder.jsx"));
const OrderSuccess = lazy(() => import("./components/cart/OrderSuccess.jsx"));
const Payment = lazy(() => import("./components/cart/Payment.jsx"));
const UserOrder = lazy(() => import("./components/cart/UserOrder.jsx"));
const OrderDetail = lazy(() => import("./components/cart/OrderDetail.jsx"));
const UpdateProfile = lazy(() => import("./components/user/UpdateProfile.jsx"));
const UpdatePassword = lazy(() =>
  import("./components/user/UpdatePassword.jsx")
);

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector(
    (state) => ({
      isAuthenticated: state.authState.isAuthenticated,
      loading: state.authState.loading,
    }),
    shallowEqual
  );

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }
  if (isAuthenticated) {
    return children;
  }
  if (loading) {
    return <Loader />;
  }
}

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser);
    async function getStripeApiKey() {
      try {
        const config = { withCredentials: true };
        const { data } = await axios.get("/api/v1/stripeapi", config);
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error("Failed to fetch Stripe API key:", error);
      }
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Stack>
        <Header />
        <Stack>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/myProfile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myProfile/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myProfile/update/password"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    {stripeApiKey ? (
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    ) : (
                      <Loader />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <UserOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<div>404 - Route Not Found</div>} />
            </Routes>
          </Suspense>
          <Sidebar />
        </Stack>
        <Footer />
      </Stack>
    </Router>
  );
};

export default App;
