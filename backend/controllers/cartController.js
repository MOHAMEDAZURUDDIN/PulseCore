const Cart = require("../model/cartModel");
const Product = require("../model/productModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Get Cart - /api/v1/cart
exports.getCart = catchAsyncError(async (req, res, next) => {
  // Find the user's cart
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product",
    "name price images stock"
  );

  if (!cart) {
    return next(new ErrorHandler("Cart is empty", 404));
  }
  res.status(200).json({
    success: true,
    cart: cart || { items: [] },
  });
});

// Add Item to Cart - /api/v1/cart/add
exports.addToCart = catchAsyncError(async (req, res, next) => {
  const { productId, quantity } = req.body;

  // Validate product and stock
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  if (product.stock < quantity) {
    return next(
      new ErrorHandler(
        `Insufficient stock. Only ${product.stock} items available`,
        400
      )
    );
  }

  let cart = await Cart.findOne({ user: req.user.id });
  if (cart) {
    // Check if product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      // Check stock for updated quantity
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock < newQuantity) {
        return next(
          new ErrorHandler(
            `Insufficient stock. Only ${product.stock} items available`,
            400
          )
        );
      }
      existingItem.quantity = newQuantity;
    } else {
      // Add new product to cart
      cart.items.push({ product: productId, quantity });
    }
    cart.updatedAt = Date.now();
    await cart.save();
  } else {
    // Create a new cart
    cart = await Cart.create({
      user: req.user.id,
      items: [{ product: productId, quantity }],
    });
  }

  // Populate the updated cart for response
  const updatedCart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product",
    "name price images stock"
  );

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    cart: updatedCart,
  });
});

// Update Item Quantity - /api/v1/cart/update
exports.updateCartItem = catchAsyncError(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }
  const item = cart.items.find((item) => item.product.toString() === productId);
  if (!item) {
    return next(new ErrorHandler("Product not found in  cart", 404));
  }
  // Validate stock
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  if (product.stock < quantity) {
    return next(
      new ErrorHandler(
        `Insufficient stock. Only ${product.stock} items available`,
        400
      )
    );
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
  } else {
    item.quantity = quantity;
  }
  cart.updatedAt = Date.now();
  await cart.save();

  const updateCart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product",
    "name price images stock"
  );
  res.status(200).json({
    success: true,
    message: `item quantity updated to ${quantity}`,
    items: updateCart ? updateCart.items : [],
  });
});

// Remove Item from Cart - /api/v1/cart/remove
exports.removeFromCart = catchAsyncError(async (req, res, next) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }
  // Find the index of the product in the cart
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex === -1) {
    return next(new ErrorHandler("Product not found in the cart"));
  }
  // Remove product from the cart
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  cart.updatedAt = Date.now();
  await cart.save();
  // Populate the cart items again to return updated cart
  const updatedCart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product",
    "name price images stock"
  );

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    items: updatedCart ? updatedCart.items : [],
  });
});

// Save Shipping Info - /api/v1/cart/shipping
exports.saveShippingInfo = catchAsyncError(async (req, res, next) => {
  const { address, city, state, country, postalCode, phoneNo } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  cart.shippingInfo = { address, city, state, country, postalCode, phoneNo };
  cart.updatedAt = Date.now();
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Shipping info saved",
    cart,
  });
});

// Clear Cart - /api/v1/cart/clear
exports.clearCart = catchAsyncError(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  cart.items = [];
  cart.shippingInfo = {};
  cart.updatedAt = Date.now();
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared",
    cart,
  });
});
