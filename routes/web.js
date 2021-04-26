const router = require("express").Router();
const webController = require("../controller/web");
// const bcrypt = require("bcrypt");
// const User = require("../model/User");

router.get("/login", webController.getLogIn);
router.get("/signup", webController.getSignUp);
router.get("/dashboard", webController.getDashboard);
router.get("/logs", webController.getLogTable);
router.get("/graphs", webController.getGraphs);
router.post("/signup", webController.postSignUp);
router.post("/login", webController.postLogIn);
router.get("/meddevice", webController.getAddDeviceForm);
router.post("/meddevice", webController.postAddDeviceForm);
//! FOR SERVING SIGNUP PAGE
// router.get("/login", (req, res) => {
//     res.render("login");
// });

// router.get("/signup", (req, res) => {
//     res.render("signup");
// });

// router.get("/dashboard", (req, res) => {
//     res.render("dashboard");
// });

// router.get("/logs", (req, res) => {
//     res.render("logtable");
// });

// router.get("/graphs", (req, res) => {
//     res.render("dashboard");
// });

// router.get("/blockchain", (req, res) => {
//     res.render("dashboard");
// });
// router.post("/signup", async (req, res) => {
// console.log(req.body.name + req.body.password + req.body.email);
// try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const newUser = new User({
//         name: req.body.name,
//         password: hashedPassword,
//         email: req.body.email,
//     });
//     const savedUser = await newUser.save();
//     console.log(`${savedUser.name} has been saved!`);
//     // Redirect user to login page!
//     return res.redirect("/login");
// } catch (err) {
//     console.log("Error: " + err);
// }
// });

// router.post("/login", async (req, res) => {
// try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//         // REDIRECT USER TO SIGNUP PAGE
//         res.redirect("/signup");
//         console.log("NO SUCH USER FOUND!");
//     }
//     const hashedPassword = user.password;
//     const userPassword = req.body.password;
//     const isPasswordCorrect = await bcrypt.compare(
//         userPassword,
//         hashedPassword
//     );
//     if (isPasswordCorrect) {
//         // REDIRECT TO DASHBOARD
//         res.redirect("/dashboard");
//         console.log("CORRECT PASSWORD!");
//     } else {
//         // REDIRECT TO LOGIN SAYING INCORRECT PASSWORD!
//         res.redirect("/login");
//         console.log("WRONG PASSWORD!");
//     }
// } catch (err) {
//     console.log("ERROR: " + err);
// }
// });

module.exports = router;
