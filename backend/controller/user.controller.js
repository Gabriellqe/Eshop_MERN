const express = require("express");
const UserModel = require("../model/user.model");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const { upload } = require("../multer");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Creater User
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await UserModel.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    // create activation token
    const createActivationToken = (user) => {
      return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
      });
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//Activation User
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
    } catch (error) {}
  })
);

/* router.post("/create-user", async (req, res, next) => {
  try {
  } catch (error) {}
});

router.post("/create-user", async (req, res, next) => {
  try {
  } catch (error) {}
});

router.post("/create-user", async (req, res, next) => {
  try {
  } catch (error) {}
});
 */
module.exports = router;
