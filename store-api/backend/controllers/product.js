import Product from "../models/product.js";

export async function getAllProductsStatic(req, res) {
  const products = await Product.find({})
    .sort("name")
    .select("name featured")
    .limit(10)
    .skip(1) /* .sort("-name") */ // Sort arranges the search results in descending order of the name field
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
  const page = Number(req.query.page) || 1; // Sets the page number to 1 if no page query is provided
  const limit = Number(req.query.limit) || 10; // Sets the limit to 10 if no limit query is provided
  const skip = (page - 1) * limit; // Calculates the number of documents to skip based on the page number and limit
  const products = await result.skip(skip).limit(limit);
  res.status(200).json({ products, nbHits: products.length });
}
