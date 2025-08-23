const Building = require("../models/buildingModel");

// Building Controller
const BuildingController = {
    async getAll(req, res) {
        try {
            const buildings = await Building.getAll();
            res.status(200).json(buildings);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const building = await Building.getById(req.params.id);
            if (building) {
                res.status(200).json(building);
            } else {
                res.status(404).json({ error: "Building not found" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const building = await Building.create(req.body);
            res.status(201).json(building);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const building = await Building.update(req.params.id, req.body);
            if (building) {
                res.status(200).json(building);
            } else {
                res.status(404).json({ error: "Building not found" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await Building.delete(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = BuildingController;