const asyncHandler = require("express-async-handler");

const Annonce = require("../models/annonceModel");
const Condidat = require("../models/condidatModel");

// @desc    Get recruter annonces
// @route   GET /api/annonces
// @access  Private
const getAllByRecruter = asyncHandler(async(req, res) => {
    const annonces = await Annonce.find({ recruter: req.user.id });

    res.status(200).json(annonces);
});

// @desc    Get annonces
// @route   GET /api/annonces/all
// @access  Private
const getAll = asyncHandler(async(req, res) => {
    const annonces = await Annonce.find();

    res.status(200).json(annonces);
});

// @desc    Add Annonces
// @route   POST /api/annonces
// @access  Private
const addAnnonce = asyncHandler(async(req, res) => {
    // if (!req.body) {
    //     res.status(400);
    //     throw new Error("Please add a text field");
    // }

    const a = {
        title: req.body.title,
        salary: req.body.salary,
        recruter: req.body.recruter,
        specialite: req.body.specialite,
    };
    console.log(a);

    const annonce = await Annonce.create(a);

    res.status(200).json(annonce);
});

const getById = asyncHandler(async(req, res) => {
    const a = await Annonce.findById(req.params.id);
    if (!a) res.status(404).json("no annonce found ");
    res.status(200).json(a);
});

const getByRecruter = asyncHandler(async(req, res) => {
    const recruter = req.params.recruter;
    const annonce = await Annonce.find({ recruter });
    console.log(annonce, "rec");
    console.log(req.params.id, "params");
    res.status(200).json(annonce);
});

// @desc    Update Annonce
// @route   PUT /api/Annoncess/:id
// @access  Private
const updateAnnonce = asyncHandler(async(req, res) => {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
        res.status(400);
        throw new Error("annonce not found");
    }

    const updatedAnnonce = await Annonce.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
        }
    );

    res.status(200).json(updatedAnnonce);
});

// @desc    Delete Annonces
// @route   DELETE /api/Annoncess/:id
// @access  Private
const deleteAnnonce = asyncHandler(async(req, res) => {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
        res.status(400);
        throw new Error("annonce not found");
    }

    // // Check for user
    // if (!req.user) {
    //     res.status(401);
    //     throw new Error("User not found");
    // }

    // // Make sure the logged in user matches the Annonces user
    // if (annonce.user.toString() !== req.user.id) {
    //     res.status(401);
    //     throw new Error("User not authorized");
    // }

    await Annonce.remove(annonce);

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getAll,
    getAllByRecruter,
    addAnnonce,
    updateAnnonce,
    deleteAnnonce,
    getById,
    getByRecruter,
};