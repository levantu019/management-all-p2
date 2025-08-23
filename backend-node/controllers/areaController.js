const Area = require("../models/areaModel");

// Area Controller
const AreaController = {
    async getAll(req, res) {
        try {
            const areas = await Area.getAll();
            res.status(200).json(areas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const area = await Area.getById(req.params.id);
            if (area) {
                res.status(200).json(area);
            } else {
                res.status(404).json({ error: "Area not found" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const area = await Area.create(req.body);
            res.status(201).json(area);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const area = await Area.update(req.params.id, req.body);
            if (area) {
                res.status(200).json(area);
            } else {
                res.status(404).json({ error: "Area not found" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await Area.delete(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = AreaController;