import connectDB from "./db/connect.js";
import Product from "./models/product.js";
/* import jsonProducts from "./products.json"; */
import dotenv from 'dotenv';
dotenv.config();

const uri = "mongodb+srv://rukevweomonedo:rukevweomonedo17@nodejsprojects.4hash.mongodb.net/STORE-API?retryWrites=true&w=majority&appName=NodejsProjects"


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

start();
