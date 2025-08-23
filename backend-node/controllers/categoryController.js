const Category = require("../models/categoryModel");

// Category Controller
const CategoryController = {
    async getAll(req, res) {
        try {
            const categories = await Category.getAll();
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const category = await Category.getById(req.params.id);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ error: "Category not found" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAllParents(req, res) {
        try {
            const categories = await Category.getAllParents(req.params.id);
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const category = await Category.create(req.body);
            res.status(201).json(category);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const category = await Category.update(req.params.id, req.body);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ error: "Category not found" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await Category.delete(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = CategoryController;