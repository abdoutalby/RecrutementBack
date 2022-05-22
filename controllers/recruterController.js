const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Recruter = require("../models/recruterModel");

// @desc    Register new Recruter
// @route   POST /api/recruters
// @access  Public
const registerRecruter = asyncHandler(async(req, res) => {
    const { name, email, password, tel, adress, status } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if Recruter exists
    const exists = await Recruter.findOne({ email });

    if (exists) {
        res.status(409);
        throw new Error(" Recruter exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create recruter
    const recruter = await Recruter.create({
        name,
        email,
        password: hashedPassword,
        status,
        tel,
        adress,
    });

    if (recruter) {
        res.status(201).json({
            _id: recruter.id,
            name: recruter.name,
            email: recruter.email,
            status,
            token: generateToken(recruter._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid recruter data");
    }
});

// @desc    Authenticate a recruter
// @route   POST /api/recruters/login
// @access  Public
const loginRecruter = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // Check for recruter email
    const recruter = await Recruter.findOne({ email });

    if (!recruter.status) {
        res.status(400);
        throw new Error("inactive recruter account");
    }
    if (recruter && (await bcrypt.compare(password, recruter.password))) {
        res.json({
            _id: recruter.id,
            name: recruter.name,
            email: recruter.email,
            token: generateToken(recruter._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// @desc    Get recruter data
// @route   GET /api/recruters/me
// @access  Private
const getAll = asyncHandler(async(req, res) => {
    recruters = await Recruter.find();
    res.status(200).json(recruters);
});

// @desc    Delete recruter data
// @route   DELETE /api/recruters/:id
// @access  Private
const deleteRecruter = asyncHandler(async(req, res) => {
    await Recruter.findByIdAndRemove(req.params.id);
    res.status(200).json("deleted " + req.params.id);
});

// @desc    Update recruter status
// @route   Put /api/recruters/:id
// @access  Private
const statusUpdate = asyncHandler(async(req, res) => {
    const recruter = await Recruter.findById(req.params.id);
    recruter.status = !recruter.status;
    await Recruter.findByIdAndUpdate(req.params.id, recruter);
    const up = await Recruter.findById(req.params.id);
    res.status(200).json(up);
});

const getById = asyncHandler(async(req, res) => {
    const recruter = await Recruter.findById(req.params.id);
    if (!recruter) {
        res.status(404).json("no recruter with this id ");
    }
    res.status(200).json(recruter);
});

// @desc    Get recruter data
// @route   GET /api/recruters/me
// @access  Private
const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

const update = asyncHandler(async(req, res) => {
    const recruter = req.body;
    console.log(req.body);
    await Recruter.findByIdAndUpdate(req.params.id, recruter);
    const up = await Recruter.findById(req.params.id);
    res.status(200).json(up);
});

module.exports = {
    registerRecruter,
    loginRecruter,
    getMe,
    getAll,
    deleteRecruter,
    statusUpdate,
    getById,
    update,
};