require("dotenv").config();
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

const OffersRouter = require("./routers/Offer.router");
const CheckoutRouter = require("./routers/checkout.router");
const CartItemsRouter = require("./routers/cart.router");
const contentOfferingRoutes = require('./routers/contentOfferingRoutes.js');
const orderRoutes = require('./routers/orderRoutes.js');

const app = express();
const port = process.env.PORT || 5000;

// Ensure upload directory exists
const uploadDirectory = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ res: "Hello World!" });
});
app.use("/offers", OffersRouter);
app.use("/checkout", CheckoutRouter);
app.use("/cartItems", CartItemsRouter);
app.use('/api/content-offerings', contentOfferingRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}

// Start Server
app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
