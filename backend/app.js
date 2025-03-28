const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 404,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const auth = require("./routes/auth");
const product = require("./routes/product");
const cart = require("./routes/cart");
const order = require("./routes/order");
const payment = require("./routes/payment");

app.use("/api/v1", auth);
app.use("/api/v1", product);
app.use("/api/v1", cart);
app.use("/api/v1", order);
app.use("/api/v1", payment);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}
app.use(errorMiddleware);

module.exports = app;
