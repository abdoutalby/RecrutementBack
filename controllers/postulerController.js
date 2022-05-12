const asyncHandler = require("express-async-handler");

const Annonce = require("../models/annonceModel");
const Condidat = require("../models/condidatModel");
const Postuler = require("../models/postulerModel");

// @desc    Get all postulations
// @route   GET /api/postulations
// @access  Private
const getAll = asyncHandler(async(req, res) => {
    const postulations = await Postuler.find();

    res.status(200).json(postulations);
});

// @desc    Get  postulation by id
// @route   GET /api/postulations/:id
// @access  Private
const getById = asyncHandler(async(req, res) => {
    const postulation = await Postuler.findById(req.params.id);

    res.status(200).json(postulation);
});

const getByC = asyncHandler(async(req, res) => {
    
    const condidat=req.params.id
    const postulation = await Postuler.find({condidat});
console.log(postulation,'postulation')
console.log(req.params.id,'params')
    res.status(200).json(postulation);
});

// @desc    Add postulation
// @route   POST /api/postulations
// @access  Private
const createPostulation = asyncHandler(async(req, res) => {
    if (!req.body.annonce) {
        res.status(400);
        throw new Error("Please add a postulation object ");
    }

    const postulation = await Postuler.create({
        annonce: req.body.annonce,
        condidat: req.body.condidat,
        diplome: req.body.diplome,
        datedep: req.body.datedep,
        reponse: "pending",
        exp: req.body.exp,
        moyfe: req.body.moyfe,
        tel: req.body.tel,
        cin: req.body.cin,
        name: req.body.name,
        lastname: req.body.lastname,
        datenaissance: req.body.datenaissance,
        email:req.body.email,
    });

    res.status(200).json(postulation);
});

// @desc    Update postulation
// @route   PUT /api/postulations/:id
// @access  Private
const updatePostulation = asyncHandler(async(req, res) => {
    const postulation = await Postuler.findById(req.params.id);
    const up = req.body

    if (!postulation) {
        res.status(400);
        throw new Error("postulation not found");
    }

    // Check for user
   

    // Make sure the logged in user matches the Annonces user
    //   if (postulation.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    //   }

    await Postuler.findByIdAndUpdate(req.params.id,up);
    const updated = await Postuler.findById(req.params.id)
    console.log(updated)
    res.status(200).json(updated);
});

// @desc    Delete postulation
// @route   DELETE /api/postulation/:id
// @access  Private
const deletePostulation = asyncHandler(async(req, res) => {
    const postulation = await Postuler.findById(req.params.id);

    if (!postulation) {
        res.status(400);
        throw new Error("postulation not found");
    }

   
 

    await Postuler.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getAll,
    updatePostulation,
    deletePostulation,
    createPostulation,
    getById,
    getByC
};