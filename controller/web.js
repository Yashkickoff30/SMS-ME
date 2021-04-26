const bcrypt = require("bcrypt");
const User = require("../model/User");
const Device = require("../model/Device");

exports.getSignUp = (req, res) => {
    res.render("signup");
};

exports.getLogIn = (req, res) => {
    res.render("login");
};

exports.getDashboard = (req, res) => {
    res.render("index");
};

exports.getLogTable = (req, res) => {
    res.render("Tables/datatables");
};

exports.getGraphs = (req, res) => {
    res.render("Charts/charts"); // Todo: Change to graph;
};

exports.getAddDeviceForm = (req, res) => {
    res.render("forms"); // Todo: Change to add Device Form
};

exports.postSignUp = async (req, res) => {
    console.log(req.body.name + req.body.password + req.body.email);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
        });
        const savedUser = await newUser.save();
        console.log(`${savedUser.name} has been saved!`);
        //* Redirect user to login page!
        return res.redirect("/login");
    } catch (err) {
        console.log("Error: " + err);
    }
};

exports.postLogIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            //* REDIRECT USER TO SIGNUP PAGE
            res.redirect("/signup");
            console.log("NO SUCH USER FOUND!");
        }
        const hashedPassword = user.password;
        const userPassword = req.body.password;
        const isPasswordCorrect = await bcrypt.compare(
            userPassword,
            hashedPassword
        );
        if (isPasswordCorrect) {
            //* REDIRECT TO DASHBOARD
            res.redirect("/dashboard");
            console.log("CORRECT PASSWORD!");
        } else {
            //* REDIRECT TO LOGIN SAYING INCORRECT PASSWORD!
            res.redirect("/login");
            console.log("WRONG PASSWORD!");
        }
    } catch (err) {
        console.log("Error: " + err);
    }
};

exports.postAddDeviceForm = async (req, res) => {
    try {
        const newDevice = new Device({
            spokeid: req.body.spokeid,
            hubid: req.body.hubid,
            devicename: req.body.devicename,
            volt: req.body.volt,
            ampere: req.body.ampere,
        });
        const savedDevice = await newDevice.save();
        console.log(
            `${savedDevice.devicename} with spoke id ${savedDevice.spokeid} has been saved!`
        );
        return res.status(201).send({ msg: "Created!" });
    } catch (err) {
        console.log("Error: " + err);
    }
};
