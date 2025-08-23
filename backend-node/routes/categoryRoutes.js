const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

// Category Routes
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.get("/all-parents/:id", CategoryController.getAllParents);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

module.exports = router;