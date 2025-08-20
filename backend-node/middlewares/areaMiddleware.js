// Middleware to validate area data
module.exports = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required." });
    }
    next();
};