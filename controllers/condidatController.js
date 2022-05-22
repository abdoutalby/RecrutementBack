const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Condidat = require("../models/condidatModel");

// @desc    Register new condidat
// @route   POST /api/condidats
// @access  Public
const registerCondidat = asyncHandler(async(req, res) => {
    const { name, email, password, tel, adress, status } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if condidat exists
    const exists = await Condidat.findOne({ email });

    if (exists) {
        res.status(400);
        throw new Error("Condidat already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create condidat
    const condidat = await Condidat.create({
        name,
        email,
        password: hashedPassword,
        tel,
        adress,
        active: req.body.active ? true : false,
    });

    if (condidat) {
        res.status(201).json({
            _id: condidat.id,
            name: condidat.name,
            email: condidat.email,
            adress: condidat.adress,
            tel: condidat.tel,
            token: generateToken(condidat._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid condidat data");
    }
});

const update = asyncHandler(async(req, res) => {
    const condidat = req.body;
    console.log(req.body);
    await Condidat.findByIdAndUpdate(req.params.id, condidat);
    const up = await Condidat.findById(req.params.id);
    res.status(200).json(up);
});

const getById = asyncHandler(async(req, res) => {
    console.log(req.params.id, "hedha l id ");
    const condidat = await Condidat.findById(req.params.id);
    if (!condidat) {
        res.status(404).json("no condidat with this id ");
    }
    res.status(200).json(condidat);
});

// @desc    Authenticate a condidat
// @route   POST /api/condidats/login
// @access  Public
const loginCondidat = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const condidat = await Condidat.findOne({ email });
    if (condidat.active) {
        if (condidat && (await bcrypt.compare(password, condidat.password))) {
            res.json({
                _id: condidat.id,
                name: condidat.name,
                email: condidat.email,
                adress: condidat.adress,
                tel: condidat.tel,
                token: generateToken(condidat._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
    } else {
        res.status(400);
        throw new Error("please activate your account");
    }
});

const changeStatus = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const condidat = await Condidat.findById(id);
    condidat.active = !condidat.active;
    await Condidat.findByIdAndUpdate(id, condidat);

    res.status(200).json(condidat);
});

// @desc    delete condidat
// @route   Delete /api/condidats/
// @access  Public
const deleteCondidat = asyncHandler(async(req, res) => {
    const id = req.params.id;

    await Condidat.findByIdAndDelete(id);
    res.status(200).json("deleted ");
});
// @desc    Get condidat data
// @route   GET /api/condidats/me
// @access  Private
const getCondidat = asyncHandler(async(req, res) => {
    res.status(200).json(req.user);
});

// @desc    Get condidats data
// @route   GET /api/condidats/all
// @access  Private
const getCondidats = asyncHandler(async(req, res) => {
    condidat = await Condidat.find();
    res.status(200).json(condidat);
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    registerCondidat,
    loginCondidat,
    getCondidat,
    getCondidats,
    deleteCondidat,
    changeStatus,
    getById,
    update,
};