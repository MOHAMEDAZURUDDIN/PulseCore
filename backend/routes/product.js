const express = require("express");
const {
  getProducts,
  getSingleProduct,
  createReview,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(isAuthenticatedUser, createReview);

module.exports = router;
