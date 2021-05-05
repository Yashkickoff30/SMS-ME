const router = require("express").Router();
const apiController = require("../controller/api");
// const State = require("../model/State");

//* Device State Info
router.post("/", apiController.addDeviceState);

//* Get Date Specific Device Info
router.get("/", apiController.getDateSpecificInfo);

//* Web - datatable
router.get("/logs", apiController.getLogs);

//* Mobile - For last stored spoke information
router.post("/deviceinfo", apiController.getDeviceInfo);

//* Web - Dashboard data
router.get("/dailydata", apiController.getDashboardData);
// router.post("/", async (req, res) => {
//     if (req.body.state == 1) {
//         const deviceState = new State({
//             id: req.body.id,
//             deviceid: req.body.deviceid,
//             hubid: req.body.hubid,
//             ontime: req.body.time,
//             date: req.body.date,
//             day: req.body.day,
//             ampere: req.body.ampere,
//             volts: req.body.volt,
//         });
//         try {
//             const savedState = await deviceState.save();
//             console.log("[On Time Success]");
//             return res.send("Success");
//         } catch (err) {
//             console.log("Error: " + err);
//         }
//     } else {
//         let randId = Math.floor(Math.random() * 1000000);
//         State.updateOne(
//             { id: req.body.REQUESTNO },
//             { $set: { id: randId, offtime: req.body.TIME } },
//             (err) => {
//                 if (err) return res.status(400).send(err);
//                 console.log("[Off Time Success]");
//                 return res.send("Success");
//             }
//         );
//     }
// });

// router.get("/logs", async (req, res) => {
//     const mydata = await State.find();
//     console.log(mydata);
//     return res.json(mydata);
// });

module.exports = router;
