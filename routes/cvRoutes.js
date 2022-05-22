const express = require("express");
const route = express.Router();

const {
    get,
    getAll,
    create,
    deleteCV,
    updateCV,
    getByDiplome,
} = require("../controllers/cvController");

route.get("/", get);
route.get("/condidat/:id", getAll);
route.post("/", create);
route.delete("/:id", deleteCV);
route.put("/:id", updateCV);
route.get("/diplome/:diplome", getByDiplome);

module.exports = route;