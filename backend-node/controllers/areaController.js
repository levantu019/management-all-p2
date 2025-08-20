const Area = require("../models/areaModel");

module.exports = {
    // Create area
    async createArea(req, res) {
        try {
            const { name, description } = req.body;

            const area = await Area(req.db).create({
                name,
                description,
            });

            res.status(201).json({ message: "Area created", area });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    // Edit area
    async editArea(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const updateData = { name, description };
            
            const [updated] = await Area(req.db).update(updateData, { where: { id } });
            if (!updated) return res.status(404).json({ message: "Area not found" });
            res.json({ message: "Area updated" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    // Delete area
    async deleteArea(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Area(req.db).destroy({ where: { id } });
            if (!deleted) return res.status(404).json({ message: "Area not found" });
            res.json({ message: "Area deleted" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    // List areas
    async listAreas(req, res) {
        try {
            const areas = await Area(req.db).findAll();
            res.json(areas);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
};