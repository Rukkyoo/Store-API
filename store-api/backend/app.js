import express from "express";
const app = express();
import dotenv from "dotenv";
import notFound from "./middleware/not-found.js";
import errorMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import productRouter from "./routes/product.js";
import asyncHandler from "express-async-errors";
/* const asyncMiddleware = asyncHandler; */


dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products</a>');
});

app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};


start();
