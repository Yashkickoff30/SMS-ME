const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB!")
);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
