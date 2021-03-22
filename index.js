const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", webRouter);
app.use("/api", apiRouter);

const mongoURI = process.env.MONGO_URI;
mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB!")
);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
