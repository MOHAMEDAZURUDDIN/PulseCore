const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart, saveShippingInfo } = require("../controllers/cartController");

const router = express.Router();

// cart routes
router.route("/cart").get(isAuthenticatedUser, getCart);
router.route("/cart/add").post(isAuthenticatedUser, addToCart);
router.route("/cart/update").put(isAuthenticatedUser, updateCartItem);
router.route("/cart/remove").delete(isAuthenticatedUser, removeFromCart);
router.route("/cart/shipping").put(isAuthenticatedUser, saveShippingInfo);
router.route("/cart/clear").delete(isAuthenticatedUser, clearCart);

module.exports = router;
