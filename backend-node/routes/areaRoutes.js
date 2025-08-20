const express = require("express");
const router = express.Router();
const areaController = require("../controllers/areaController");
const validateArea = require("../middlewares/areaMiddleware");

// Inject sequelize instance to controller via req.db
router.use((req, res, next) => {
    req.db = require("../config/database");
    next();
});

router.post("/", validateArea, areaController.createArea);
router.put("/:id", validateArea, areaController.editArea);
router.delete("/:id", areaController.deleteArea);
router.get("/", areaController.listAreas);

module.exports = router;