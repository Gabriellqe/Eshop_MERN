const express = require("express");
const ShopModel = require("../model/shop.model");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const { upload } = require("../multer");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shopToken.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller } = require("../middleware/auth");

// create shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email, password, name, address, phoneNumber, zipCode } = req.body;
    const sellerEmail = await ShopModel.findOne({ email });

    if (sellerEmail) {
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

    const seller = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      zipCode: zipCode,
      address: address,
      avatar: fileUrl,
    };

    // create activation token
    const createActivationToken = (seller) => {
      return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
      });
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:3000/shop/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your account",
        message: `Hello ${seller.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// activate shop
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      //Verify if the token is ok
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      // if the token is not valid
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      //desctruing the newSeller object
      const { name, email, password, avatar, address, phoneNumber, zipCode } =
        newSeller;

      //check if the email already exists in  the database
      let seller = await ShopModel.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      //create a new seller
      seller = await ShopModel.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      //create a token for the new seller
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Login Shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }
      const shop = await ShopModel.findOne({ email }).select("+password");

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }
      const isPasswordValid = await shop.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      // thats send token to cookies for used in the middleware Auth
      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Load Shop
router.get(
  "/getseller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await ShopModel.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop by id
router.get("/get-shop/:id", async (req, res) => {});
// get all shops
router.get("/get-all-shops", async (req, res) => {});

// load shop
// log out from shop
// get shop info
// update shop profile picture
// update seller info

module.exports = router;
