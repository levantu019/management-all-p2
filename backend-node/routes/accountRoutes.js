const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const validateAccount = require("../middlewares/accountMiddleware");

// Inject sequelize instance to controller via req.db
router.use((req, res, next) => {
    req.db = require("../config/database");
    next();
});

router.post("/", validateAccount, accountController.createAccount);
router.put("/:id", validateAccount, accountController.editAccount);
router.delete("/:id", accountController.deleteAccount);
router.get("/", accountController.listAccounts);

module.exports = router;