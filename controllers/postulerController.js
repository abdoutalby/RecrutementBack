const asyncHandler = require('express-async-handler')

const Annonce = require('../models/annonceModel')
const Condidat = require('../models/condidatModel')
const Postuler = require('../models/postulerModel')

// @desc    Get all postulations 
// @route   GET /api/postulations
// @access  Private
const getAll = asyncHandler(async (req, res) => {
  const postulations = await Postuler.find()

  res.status(200).json(postulations)
})



 // @desc    Get  postulation by id
// @route   GET /api/postulations/:id
// @access  Private
const  getById = asyncHandler(async (req, res) => {
    const postulation = await Postuler.findById(req.params.id)
  
    res.status(200).json(postulation)
  })

// @desc    Add postulation
// @route   POST /api/postulations
// @access  Private
const createPostulation = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const postulation = await Postuler.create({
    annonce: req.body.annonce,
    condidat : req.body.condidat,
    reponse: null,
  })

  res.status(200).json(postulation)
})

// @desc    Update postulation
// @route   PUT /api/postulations/:id
// @access  Private
const updatePostulation = asyncHandler(async (req, res) => {
  const postulation = await Postuler.findById(req.params.id)

  if (!postulation) {
    res.status(400)
    throw new Error('postulation not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the Annonces user
//   if (postulation.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

  const updated  = await Postuler.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updated)
})

// @desc    Delete postulation
// @route   DELETE /api/postulation/:id
// @access  Private
const deletePostulation = asyncHandler(async (req, res) => {
  const postulation = await Postuler.findById(req.params.id)

  if (!postulation) {
    res.status(400)
    throw new Error('postulation not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

//   // Make sure the logged in user matches the Annonces user
//   if (annonce.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

  await Postuler.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
 getAll,
 updatePostulation,
 deletePostulation,
 createPostulation,
 getById,
}
