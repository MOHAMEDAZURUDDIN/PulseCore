const products = require("../data/data.json");
const Product = require("../model/productModel");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products Deleted!");
    await Product.insertMany(products);
    console.log("All Products Added!");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedProducts();
