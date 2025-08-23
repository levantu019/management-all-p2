const db = require("../database");

// Category Model
const Category = {
    async getAll() {
        const res = await db.query(
            "SELECT id, name, description, parent_id, area_id, priority FROM category"
        );
        return res.rows;
    },

    async getById(id) {
        const res = await db.query(
            "SELECT id, name, description, parent_id, area_id, priority FROM category WHERE id = $1",
            [id]
        );
        return res.rows[0];
    },

    async getAllParents(id) {
        const res = await db.query(
            `SELECT 
                result->>'id' as id,
                result->>'name' as name,
                result->>'parent_id' as parent_id
            FROM get_all_parents('category', $1)`,
            [id]
        );
        return res.rows;
    },

    async create({ name, description, parent_id, area_id, priority }) {
        const res = await db.query(
            `INSERT INTO category (name, description, parent_id, area_id, priority)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, description, parent_id, area_id, priority`,
            [name, description, parent_id, area_id, priority]
        );
        return res.rows[0];
    },

    async update(id, { name, description, parent_id, area_id, priority }) {
        const res = await db.query(
            `UPDATE category SET name=$1, description=$2, parent_id=$3, area_id=$4, priority=$5
             WHERE id=$6
             RETURNING id, name, description, parent_id, area_id, priority`,
            [name, description, parent_id, area_id, priority, id]
        );
        return res.rows[0];
    },

    async delete(id) {
        await db.query("DELETE FROM category WHERE id=$1", [id]);
        return { message: "Deleted" };
    },
};

module.exports = Category;
