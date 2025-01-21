import express from "express";
const app = express();
import dotenv from "dotenv";
import notFound from "./middleware/not-found.js";
import errorMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import productRouter from "./routes/product.js";

dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products</a>');
});

app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};


start();
