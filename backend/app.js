const express = require("express");
app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");
const morgan = require("morgan");

//import routes
const userRoute = require("./controller/user.controller");
const shopRoute = require("./controller/shop.controller");

// config init
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/shop", shopRoute);

// config environment
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
