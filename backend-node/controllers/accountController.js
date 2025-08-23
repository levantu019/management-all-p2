const Account = require('../models/accountModel');
const { accountSchema, accountUpdateSchema } = require('../validators/accountValidator');

// 
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccount = async (req, res) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const { error } = accountSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check for duplicate username
    const existing = await Account.getByUsername(req.body.username);
    if (existing) return res.status(409).json({ error: 'Username already exists' });

    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { error } = accountUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check for duplicate username (if changed)
    const existing = await Account.getByUsername(req.body.username);
    if (existing && existing.id != req.params.id) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const account = await Account.update(req.params.id, req.body);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });

    await Account.delete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount
};