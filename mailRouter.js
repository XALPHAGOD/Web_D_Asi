const { Router } = require("express");
const nodemailer = require("nodemailer");
const { generateMail } = require("./mailUtils");

const router = Router();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/", async (req, res) => {
  const email = generateMail(req);
  try {
    const resp = await transporter.sendMail({
      from: process.env.EMAIL,
      to: req.body.mailto,
      html: email,
    });
    // console.log(resp);
    res.send("View Email at: " + nodemailer.getTestMessageUrl(resp));
  } catch (error) {
    // console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
