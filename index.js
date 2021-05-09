const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const swaggerDoc = YAML.load("./swagger.yaml");

const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
// app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", webRouter);
app.use("/api", apiRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const mongoURI = process.env.MONGO_URI;
mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB!")
);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
