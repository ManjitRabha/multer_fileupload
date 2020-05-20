const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// import moddel
const Student = require("../models/Student");

// Multer Setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/myuploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// Upload only pdf file
var upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Set limit of the file to 1mb
  // => Addin file filter for pdf file only<=

  // fileFilter: function (req, file, cb) {
  //   if (path.extname(file.originalname) !== ".pdf") {
  //     return cb(new Error("Only pdfs are allowed"));
  //   }
  //   cb(null, true);
  // },
}).single("profilepic");

// Home page
router.get("/", (_req, res) => {
  let getData = Student.find({});
  getData.exec((err, data) => {
    if (err) throw err;
    res.render("index", { records: data });
  });
});

// To upload file unsing multer you have to add middleware (uplad) as given below and follow the others

// Form submit Route
router.post("/addData", upload, (req, res) => {
  let newStudent = new Student({
    name: req.body.name,
    fatherName: req.body.fatherName,
    courses: req.body.courses,
    profilepic: req.file.filename,
  });
  newStudent.save(function (err, req1) {
    if (err) throw err;
    Student.find({}).exec(function (err, data) {
      if (err) throw err;
      res.render("index", {
        records: data,
        success: `Data has been uploaded successfully..`,
        filename: `myuploads/${req.file.filename}`,
      });
    });
  });
});
module.exports = router;
