const { Router } = require("express");
const multer = require("multer");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const destPath = path.join(__dirname, "Uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath);
    }
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const fName = file.originalname;
    cb(
      null,
      fName.slice(0, fName.lastIndexOf(".")) +
        "-" +
        moment().format("MMM-DD-YYYY-HH-MM-SS") +
        path.extname(fName)
    );
  },
});

const upload = multer({ storage, limits: { fileSize: 10000000 } });

const router = Router();

router.post("/", upload.single("file"), (req, res, next) => {
  // console.log(req.file);
  if (req.file === undefined && req.files === undefined)
    return next(Error("Please Select Valid File(s)"));
  res.send("Uploaded");
});

module.exports = router;
