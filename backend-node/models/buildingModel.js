const db = require("../database");

// Building Model
const Building = {
    async getAll() {
        const res = await db.query(
            "SELECT id, name, coordinate, description, target_id FROM building"
        );
        return res.rows;
    },

    async getById(id) {
        const res = await db.query(
            "SELECT id, name, coordinate, description, target_id FROM building WHERE id = $1",
            [id]
        );
        return res.rows[0];
    },

    async create({ name, coordinate, description, target_id }) {
        const res = await db.query(
            `INSERT INTO building (name, coordinate, description, target_id)
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, coordinate, description, target_id`,
            [name, coordinate, description, target_id]
        );
        return res.rows[0];
    },

    async update(id, { name, coordinate, description, target_id }) {
        const res = await db.query(
            `UPDATE building SET name=$1, coordinate=$2, description=$3, target_id=$4
             WHERE id=$5
             RETURNING id, name, coordinate, description, target_id`,
            [name, coordinate, description, target_id, id]
        );
        return res.rows[0];
    },

    async delete(id) {
        await db.query("DELETE FROM building WHERE id=$1", [id]);
        return { message: "Deleted" };
    }
};

module.exports = Building;