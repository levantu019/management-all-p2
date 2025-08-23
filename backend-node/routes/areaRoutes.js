const express = require("express");
const router = express.Router();
const AreaController = require("../controllers/areaController");

// Area Routes
router.get("/", AreaController.getAll);
router.get("/:id", AreaController.getById);
router.post("/", AreaController.create);
router.put("/:id", AreaController.update);
router.delete("/:id", AreaController.delete);

module.exports = router;