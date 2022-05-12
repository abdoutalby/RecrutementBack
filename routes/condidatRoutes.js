const express = require("express");
const router = express.Router();
const {
    loginCondidat,
    registerCondidat,
    getCondidat,
    getCondidats,
    deleteCondidat,
    changeStatus,
    getById,
    update,
} = require("../controllers/condidatController");
const { CondidatProtect } = require("../middleware/condidatMiddleware");

router.post("/", registerCondidat);
router.post("/login", loginCondidat);
router.get("/me", CondidatProtect, getCondidat);
router.get("/", getCondidats);
router.get("/:id", getById);
router.delete("/:id", deleteCondidat);
router.put("/:id", changeStatus);

router.patch("/:id", update);

module.exports = router;