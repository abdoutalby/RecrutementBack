const asyncHandler = require("express-async-handler");

const CV = require("../models/cvModel");
const Condidat = require("../models/condidatModel");

// @desc    Get cv
// @route   GET /api/cv
// @access  Private
const get = asyncHandler(async(req, res) => {
    const cv = await CV.find();

    res.status(200).json(cv);
});

// @desc    Get CVs
// @route   GET /api/cv/all
// @access  Private
const getAll = asyncHandler(async(req, res) => {
    const condidat = req.params.id;
    const cvs = await CV.findOne({
        condidat,
    });

    res.status(200).json(cvs);
});

// @desc    Add cv
// @route   POST /api/cv
// @access  Private
const create = asyncHandler(async(req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Please add  fields");
    }

    const cv = await CV.create({
        condidat: req.body.condidat,
        name: req.body.name,
        email: req.body.email,
        adress: req.body.adress,
        tel: req.body.tel,
        niveau: req.body.niveau,
        langues: req.body.langues,
        formation: req.body.formation,
        diplome: req.body.diplome,
        experience: req.body.experience,
    });

    res.status(200).json(cv);
});

// @desc    Update cv
// @route   PUT /api/cv/:id
// @access  Private
const updateCV = asyncHandler(async(req, res) => {
    const cv = await CV.findById(req.params.id);

    if (!cv) {
        res.status(400);
        throw new Error("CV not found");
    }

    //   // Check for user
    //   if (!req.user) {
    //     res.status(401)
    //     throw new Error('User not found')
    //   }

    //   // Make sure the logged in user matches the CV condidat
    //   if (cv.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    //   }

    const updated = await CV.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    const up = await CV.findById(req.params.id);

    res.status(200).json(up);
});

// @desc    Delete CV
// @route   DELETE /api/cv/:id
// @access  Private
const deleteCV = asyncHandler(async(req, res) => {
    const cv = await CV.findById(req.params.id);

    if (!cv) {
        res.status(400);
        throw new Error("CV not found");
    }
    console.log("deleeeeteeeddd ");
    await CV.remove();

    res.status(200).json({ id: req.params.id });
});

// @desc    get  CV by diplome
// @route   DELETE /api/cv/diplome/:diplome
// @access  Private
const getByDiplome = asyncHandler(async(req, res) => {
    const diplome = req.params.diplome;
    const cv = await CV.find({
        "diplome": {
            $regex: ".*" + diplome + "*.",
        },
    });

    res.status(200).json(cv);
});

module.exports = {
    getByDiplome,
    getAll,
    get,
    updateCV,
    deleteCV,
    create,
};