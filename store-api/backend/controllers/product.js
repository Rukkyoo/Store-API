import Product from "../models/product.js";

export async function getAllProductsStatic(req, res) {
  const products = await Product.find({ featured: true });
  res.status(200).json({ products, nbHits: products.length });
}
export async function getAllProducts(req, res) {
  const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: products.length });
}
