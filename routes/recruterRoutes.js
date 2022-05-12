const express = require("express");
const router = express.Router();
const {
    registerRecruter,
    loginRecruter,
    getMe,
    getAll,
    deleteRecruter,
    statusUpdate,
    getById,
    update,
} = require("../controllers/recruterController");
const { recruterProtect } = require("../middleware/recruterMiddleware");

router.post("/register", registerRecruter);
router.post("/login", loginRecruter);
router.get("/", getAll);
router.delete("/:id", deleteRecruter);
router.put("/:id", statusUpdate);
router.get("/me/:id", getById);
router.patch("/:id", update);

module.exports = router;