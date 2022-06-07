require("dotenv").config();
const express = require("express");
const mailRouter = require("./mailRouter");
const fileRouter = require("./fileRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mail", mailRouter);
app.use("/file", fileRouter);

app.get("*", (req, res) => {
  res.send("Express Server");
});

app.use((err, req, res, next) => {
  // console.log(err);
  res.status(500).send(err.message);
});

app.listen(3000);
