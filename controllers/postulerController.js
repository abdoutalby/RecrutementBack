const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const Annonce = require("../models/annonceModel");
const Condidat = require("../models/condidatModel");
const Postuler = require("../models/postulerModel");
const Qes = require("../models/qes");

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "abderrahmentalby@gmail.com",
        pass: "25556506@gmail",
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

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

const accept = asyncHandler(async(req, res) => {
    const postulation = await Postuler.findById(req.params.id);
    postulation.reponse = "accepted";
    await Postuler.findByIdAndUpdate(postulation._id, postulation);
    const p = await Postuler.findById(req.params.id);
    res.status(200).json(p);
});

const reject = asyncHandler(async(req, res) => {
    const postulation = await Postuler.findById(req.params.id);
    postulation.reponse = "rejected";
    await Postuler.findByIdAndUpdate(postulation._id, postulation);
    const p = await Postuler.findById(req.params.id);
    res.status(200).json(p);
});

const getByC = asyncHandler(async(req, res) => {
    const condidat = req.params.id;
    const postulation = await Postuler.find({ condidat });
    console.log(postulation, "postulation");
    console.log(req.params.id, "params");
    res.status(200).json(postulation);
});

const getByRec = asyncHandler(async(req, res) => {
    const recruter = req.params.id;
    var p = [];
    const annonces = await Annonce.find({ recruter });
    console.log(
        annonces,
        "hedhom les annonce lkol ----------------------------------------------------"
    );
    for await (const element of annonces) {
        const annonce = element._id.toString();
        console.log(annonce, "id");
        const a = await Postuler.find({ annonce });
        for await (pp of a) {
            p.push(pp);
        }
    }

    await console.log(p, "postulation");
    res.status(200).json(p);
});

const getByA = asyncHandler(async(req, res) => {
    const annonce = req.params.id;
    const postulation = await Postuler.find({ annonce });
    res.status(200).json(postulation);
});

const qestionaire = asyncHandler(async(req, res) => {
    const data = req.body;

    const q = await Qes.create(data);
    if (q) {
        res.status(201).json(q);
    }
});

const getQuest = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const p = await Postuler.findById(id);
    const postulation = p._id;
    const q = await Qes.find({
        postulation,
    });

    res.status(200).json(q);
});

// @desc    Add postulation
// @route   POST /api/postulations
// @access  Private
const createPostulation = asyncHandler(async(req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Please add a postulation object ");
    }
    console.log(req.body, "hedha fesh nabeth ");
    const { annonce, condidat } = req.body;

    const postul = await Postuler.find({ annonce });
    console.log(postul, "hedhy lpostulation condidat");
    console.log("condidat =", condidat, "annonce =", annonce);

    if (postul.length > 0 && postul[0].condidat === condidat) {
        console.log(postul[0].condidat === condidat, "hedha test");
        res.status(409);
        throw new Error("already postuled");
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
        email: req.body.email,
    });

    if (postulation) {
        const mailData = {
            from: "abderrahmentalby@gmail.com",
            to: postulation.email,
            subject: "Postulation",
            html: "<b>Hey there! </b><br> this mail is to annonce you that you have postuled <br/>",
        };

        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                res.status(409).json("something went wrong ");
            }
        });
    }
    res.status(200).json(postulation);
});

const email = asyncHandler(async(req, res) => {
    const { to, subject, text } = req.body;
    if (!to) {
        res.status(400).send("please verify ");
    }
});

// @desc    Update postulation
// @route   PUT /api/postulations/:id
// @access  Private
const updatePostulation = asyncHandler(async(req, res) => {
    const postulation = await Postuler.findById(req.params.id);
    const up = req.body;

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

    await Postuler.findByIdAndUpdate(req.params.id, up);
    const updated = await Postuler.findById(req.params.id);
    console.log(updated);
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
    getByC,
    email,
    getByRec,
    reject,
    accept,
    getByA,
    qestionaire,
    getQuest,
};