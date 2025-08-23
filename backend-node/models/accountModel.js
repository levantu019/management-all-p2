//
const db = require("../database");
const bcrypt = require('bcrypt');

// Account model
const Account = {
    async getAll() {
        const res = await db.query(
            "SELECT id, name, position, username FROM account"
        );
        return res.rows;
    },
    async getById(id) {
        const res = await db.query(
            "SELECT id, name, position, username FROM account WHERE id = $1",
            [id]
        );
        return res.rows[0];
    },
    async create({ name, position, username, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const res = await db.query(
            "INSERT INTO account (name, position, username, password) VALUES ($1, $2, $3, $4) RETURNING id, name, position, username",
            [name, position, username, hashedPassword]
        );
        return res.rows[0];
    },
    async update(id, { name, position, username, password }) {
        let query, params;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query =
                "UPDATE account SET name=$1, position=$2, username=$3, password=$4 WHERE id=$5 RETURNING id, name, position, username";
            params = [name, position, username, hashedPassword, id];
        } else {
            query =
                "UPDATE account SET name=$1, position=$2, username=$3 WHERE id=$4 RETURNING id, name, position, username";
            params = [name, position, username, id];
        }
        const res = await db.query(query, params);
        return res.rows[0];
    },
    async delete(id) {
        await db.query("DELETE FROM account WHERE id=$1", [id]);
        return { message: "Deleted" };
    },
    async getByUsername(username) {
        const res = await db.query(
            "SELECT * FROM account WHERE username = $1",
            [username]
        );
        return res.rows[0];
    },
};

module.exports = Account;
