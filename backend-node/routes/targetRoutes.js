const express = require("express");
const router = express.Router();
const TargetController = require("../controllers/targetController");

// Target Routes
router.get("/", TargetController.getAll);
router.get("/:id", TargetController.getById);
router.get("/category/:id", TargetController.getByCategory);
router.post("/", TargetController.create);
router.put("/:id", TargetController.update);
router.delete("/:id", TargetController.delete);

module.exports = router;