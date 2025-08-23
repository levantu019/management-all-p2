const express = require("express");
const router = express.Router();
const BuildingController = require("../controllers/buildingController");

// Building Routes
router.get("/", BuildingController.getAll);
router.get("/:id", BuildingController.getById);
router.post("/", BuildingController.create);
router.put("/:id", BuildingController.update);
router.delete("/:id", BuildingController.delete);

module.exports = router;