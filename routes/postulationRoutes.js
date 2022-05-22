const express = require("express");
const router = express.Router();

const {
    getAll,
    updatePostulation,
    deletePostulation,
    createPostulation,
    getById,
    getByC,
    getByRec,
    accept,
    reject,
    getByA,
    getQuest,
    qestionaire,
} = require("../controllers/postulerController");

router.get("/", getAll);
router.post("/", createPostulation);
router.delete("/:id", deletePostulation);
router.put("/:id", updatePostulation);
router.get("/:id", getById);
router.get("/condidat/:id", getByC);
router.get("/annonce/:id", getByA);

router.put("/accept/:id", accept);
router.put("/reject/:id", reject);
router.get("/recruter/:id", getByRec);
router.get("/qes/:id", getQuest);
router.post("/qes", qestionaire);

module.exports = router;