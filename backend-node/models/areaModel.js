const db = require("../database");

// Area Model
const Area = {
    async getAll() {
        const res = await db.query(
            "SELECT id, name, description FROM area"
        );
        return res.rows;
    },

    async getById(id) {
        const res = await db.query(
            "SELECT id, name, description FROM area WHERE id = $1",
            [id]
        );
        return res.rows[0];
    },

    async create({ name, description }) {
        const res = await db.query(
            "INSERT INTO area (name, description) VALUES ($1, $2) RETURNING id, name, description",
            [name, description]
        );
        return res.rows[0];
    },

    async update(id, { name, description }) {
        const res = await db.query(
            "UPDATE area SET name=$1, description=$2 WHERE id=$3 RETURNING id, name, description",
            [name, description, id]
        );
        return res.rows[0];
    },

    async delete(id) {
        await db.query("DELETE FROM area WHERE id=$1", [id]);
        return { message: "Deleted" };
    }
};

module.exports = Area;