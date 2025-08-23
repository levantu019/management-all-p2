const db = require("../database");

// Target Model
const Target = {
    async getAll() {
        const res = await db.query(
            "SELECT id, name, coordinate, boundary, date_created, type, icon, general_information, parent_id FROM target"
        );
        return res.rows;
    },

    async getById(id) {
        const res = await db.query(
            "SELECT id, name, coordinate, boundary, date_created, type, icon, general_information, parent_id FROM target WHERE id = $1",
            [id]
        );
        return res.rows[0];
    },

    async getByCategory(category_id) {
        const res = await db.query(
            `SELECT b.*
                FROM target b
                INNER JOIN target_category c ON b.id = c.target_id
                INNER JOIN category a ON a.id = c.category_id
                WHERE a.id = $1`,
            [category_id]
        );
        return res.rows;
    },

    async create({
        name,
        coordinate,
        boundary,
        type,
        icon,
        general_information,
        parent_id,
    }) {
        const res = await db.query(
            `INSERT INTO target (name, coordinate, boundary, type, icon, general_information, parent_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING id, name, coordinate, boundary, date_created, type, icon, general_information, parent_id`,
            [
                name,
                coordinate,
                boundary,
                type,
                icon,
                general_information,
                parent_id,
            ]
        );
        return res.rows[0];
    },

    async update(
        id,
        {
            name,
            coordinate,
            boundary,
            type,
            icon,
            general_information,
            parent_id,
        }
    ) {
        const res = await db.query(
            `UPDATE target SET name=$1, coordinate=$2, boundary=$3, type=$4, icon=$5, general_information=$6, parent_id=$7
             WHERE id=$8
             RETURNING id, name, coordinate, boundary, date_created, type, icon, general_information, parent_id`,
            [
                name,
                coordinate,
                boundary,
                type,
                icon,
                general_information,
                parent_id,
                id,
            ]
        );
        return res.rows[0];
    },

    async delete(id) {
        await db.query("DELETE FROM target WHERE id=$1", [id]);
        return { message: "Deleted" };
    },
};

module.exports = Target;
