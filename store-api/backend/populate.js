import connectDB from "./db/connect.js";
import Product from "./models/product.js";
import fs from "fs";
const jsonProducts = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); // delete all products
    await Product.create(jsonProducts);
    console.log("Success! Imported products");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
