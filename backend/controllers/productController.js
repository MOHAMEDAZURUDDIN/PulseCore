const Product = require("../model/productModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Get Products - api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  const totalProductsCount = await Product.countDocuments({});
  res.status(200).json({
    success: true,
    count: totalProductsCount,
    products,
  });
});

// Get Single Product  -api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    "reviews.user",
    "name email"
  );
  if (!product) {
    return next(new ErrorHandler("Product not found!", 400));
  }
  res.status(201).json({
    success: true,
    product,
  });
});

// create review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  // Create a review object with the user, rating, and comment
  const review = {
    user: req.user.id,
    rating,
    comment,
  };

  // Find the product by its ID
  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  //   Check if the user has already reviewed this product
  const existingReview = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );
  if (existingReview) {
    // Update the existing review
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    //   Add a new review
    product.reviews.push(review);
  }
  // Update the number of reviews and calculate the average rating
  product.numOfReviews = product.reviews.length;
  product.ratings =
    product.reviews.reduce((sum, rev) => sum + rev.rating, 0) /
    product.reviews.length;

  // Save the updated product
  await product.save();

  // Send response
  res.status(200).json({
    success: true,
    message: "Review Added",
  });
});
