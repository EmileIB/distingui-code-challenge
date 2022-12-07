import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import cors from "cors";
import { DB_HOST, DB_PORT, DB_NAME } from "./app/config/db.config";

import { register } from "./app/controllers/auth.controller";

import { Response } from "./app/helpers";

import path from "path";
const __dirname = path.resolve(path.dirname(""));

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use(fileUpload());

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  Response.success(res, "Welcome to the menu-api application.");
});

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// routes
import { routes } from "./app/routes";
routes.forEach((route) => {
  route(app);
});

// static files
app.use(express.static(__dirname + "/app/public"));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

register("admin", "admin");
