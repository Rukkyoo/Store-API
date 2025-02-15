import Product from "../models/product.js";

export async function getAllProductsStatic(req, res) {
  const products = await Product.find({ 
    name: "Vase",
   });
  res.status(200).json({ products, nbHits: products.length });
}
export async function getAllProducts(req, res) {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = name;
  }

  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
}
