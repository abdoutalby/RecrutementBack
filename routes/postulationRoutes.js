const express = require("express");
const router = express.Router();

const { CondidatProtect } = require("../middleware/condidatMiddleware");

const {
    getAll,
    updatePostulation,
    deletePostulation,
    createPostulation,
    getById,
    getByC,
} = require("../controllers/postulerController");

router.get("/", getAll);
router.post("/", createPostulation);
router.delete("/:id", deletePostulation);
router.put("/:id", updatePostulation);
router.get("/:id", getById);
router.get("/condidat/:id",getByC)

module.exports = router;