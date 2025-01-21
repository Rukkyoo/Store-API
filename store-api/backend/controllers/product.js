

export async function getAllProductsStatic (req, res) {
    res.status(200).json({ msg: "products testing route" });
}
export async function getAllProducts (req, res) {
    res.status(200).json({ msg: "products route" });
}