const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

const app = express();

app.use("/webhook", express.raw({ type: "application/json" }), webhookRoutes);

const corsOptions = {
  origin: [
    "https://bookstore-eight-gilt.vercel.app"
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
