const express = require("express");
const router = express.Router();
const {
    addAnnonce,
    getAll,
    getAllByRecruter,
    getById,
    deleteAnnonce,
} = require("../controllers/annonceController");
const { recruterProtect } = require("../middleware/recruterMiddleware");

router.post("/", addAnnonce);
router.get("/byRecruter/", getAllByRecruter);
router.get("/all", getAll);
router.get("/:id", getById);
router.delete("/:id", deleteAnnonce);

module.exports = router;