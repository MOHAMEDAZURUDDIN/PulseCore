const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to handle this resourse", 401));
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(
      new ErrorHandler("Invalid or expired token, please login again", 401)
    );
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("User not found, please login again", 404));
  }
  req.user = user;
  next();
});
