const Target = require("../models/targetModel");

// Target Controller
const TargetController = {
    async getAll(req, res) {
        try {
            const targets = await Target.getAll();
            res.status(200).json(targets);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const target = await Target.getById(req.params.id);
            if (target) {
                res.status(200).json(target);
            } else {
                res.status(404).json({ error: "Target not found" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getByCategory(req, res) {
        try {
            const targets = await Target.getByCategory(req.params.id);
            res.status(200).json(targets);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const target = await Target.create(req.body);
            res.status(201).json(target);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const target = await Target.update(req.params.id, req.body);
            if (target) {
                res.status(200).json(target);
            } else {
                res.status(404).json({ error: "Target not found" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await Target.delete(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = TargetController;