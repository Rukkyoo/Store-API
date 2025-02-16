import Product from "../models/product.js";

export async function getAllProductsStatic(req, res) {
  const products = await Product.find({}).select("name featured")/* .sort("-name") */; // Sort arranges the search results in descending order of the name field
  res.status(200).json({ products, nbHits: products.length });
}
export async function getAllProducts(req, res) {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; // Ensures there is no case sensitivity in the search
  }

  let result = Product.find(queryObject); // Searches the database based on the query object
  if (sort) {
    const sortList = sort.split(",").join(" "); // Converts the sort query to a string
    result = result.sort(sortList); // Sorts the search results based on the sort query
    console.log(sort);
  } else {
    result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" "); // Converts the fields query to a string
    result = result.select(fieldsList); // Selects the fields to be returned in the search results
  } 
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
}
