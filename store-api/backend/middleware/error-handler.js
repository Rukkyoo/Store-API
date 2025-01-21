export default function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong, please try again" });
}