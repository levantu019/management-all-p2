const bcrypt = require("bcryptjs");
const Account = require("../models/accountModel");

module.exports = {
    // Create account
    async createAccount(req, res) {
        try {
            const { name, position, username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);

            const account = await Account(req.db).create({
                name,
                position,
                username,
                password: hashedPassword,
            });

            res.status(201).json({ message: "Account created", account });
        } catch (err) {
            if (err.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ message: "Username already exists." });
            }
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    // Edit account
    async editAccount(req, res) {
        try {
            const { id } = req.params;
            const { name, position, username, password } = req.body;
            const updateData = { name, position, username };
            if (password) {
                updateData.password = await bcrypt.hash(password, 12);
            }
            const [updated] = await Account(req.db).update(updateData, { where: { id } });
            if (!updated) return res.status(404).json({ message: "Account not found" });
            res.json({ message: "Account updated" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    // Delete account
    async deleteAccount(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Account(req.db).destroy({ where: { id } });
            if (!deleted) return res.status(404).json({ message: "Account not found" });
            res.json({ message: "Account deleted" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    // List accounts
    async listAccounts(req, res) {
        try {
            const accounts = await Account(req.db).findAll();
            res.json(accounts);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
};