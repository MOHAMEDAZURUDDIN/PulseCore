const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");

// Create New Order - /api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });
  // Update product stock
  for (const orderItem of orderItems) {
    const product = await Product.findById(orderItem.product);
    if (product) {
      product.stock -= orderItem.quantity;
      await product.save({ validateBeforeSave: false });
    }
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// Get Single Order - /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, order });
});
// Get Logged-in User Orders - /api/v1/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({ success: true, orders });
});
