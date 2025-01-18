import express from "express";
const app = express();
import dotenv from "dotenv";
import notFound from "./middleware/not-found.js";
import errorMiddleware from "./middleware/error-handler.js";

dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/products">products</a>');
});

app.use(notFound);
app.use(errorMiddleware);
const start = async () => {
  try {
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
