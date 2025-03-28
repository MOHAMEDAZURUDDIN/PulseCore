import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import CategoryList from "../categories/CategoryList";
import FirstFlex from "../layout/FirstFlex";
import FeaturedCategories from "../layout/FeaturedCategories";
import PopularSales from "../product/PopularSales";
import ExclusiveCard from "../layout/ExclusiveCard";
import TrendingProduct from "../layout/TrendingProduct";
import TopBanner from "../layout/TopBanner";
import AboutUs from "../layout/AboutUs";
import Service from "../layout/Service";
import CustomSnackbar from "../../utils/CustomSnackbar";
import Loader from "../layout/Loader";
import { getProducts } from "../../redux/actions/productActions";
import { clearError } from "../../redux/slices/productsSlice";
import { useLocation } from "react-router-dom";

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };
  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  return { snackbar, showSnackbar, closeSnackbar };
};
const Home = () => {
  const dispatch = useDispatch();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const location = useLocation();
  const { loading, error } = useSelector(
    (state) => ({
      loading: state.productsState.loading,
      error: state.productsState.error,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error, showSnackbar]);

  // Scroll to section based on hash
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  // Cleanup error state
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Stack>
          <CategoryList />
          <FirstFlex />
          <TopBanner />
          <FeaturedCategories />
          <div id="popular-sales">
            <PopularSales />
          </div>
          <TrendingProduct />
          <div id="about-us">
            <AboutUs />
          </div>
          <ExclusiveCard />
          <div id="services">
            <Service />
          </div>
        </Stack>
      )}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.type}
        handleClose={closeSnackbar}
      />
    </>
  );
};

export default Home;
