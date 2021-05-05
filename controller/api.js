const State = require("../model/State");
const Device = require("../model/Device");

const findThreshold = async (spokeId, hubId) => {
    try {
        const device = await Device.findOne({
            $and: [{ spokeid: spokeId }, { hubid: hubId }],
        });
        console.log(
            `${device.devicename} with spokeid ${device.spokeid} and hubid ${device.hubid} obtained! Its threshold is ${device.threshold}`
        );
        return device.threshold;
    } catch (err) {
        console.log("Error: " + err);
        return err;
    }
};

exports.addDeviceState = async (req, res) => {
    // const threshold = await findThreshold(req.body.spokeid, req.body.hubid);
    // Todo: 1. Retrieve the threshold value for the particular equipment using the Device document using the findThreshold function.
    // Todo: 2. Check whether device is Idle by writing a function and include that value in the new State object!
    if (req.body.state == 1) {
        const deviceState = new State({
            id: req.body.id,
            spokeid: req.body.spokeid,
            hubid: req.body.hubid,
            ontime: req.body.time,
            date: req.body.date,
            day: req.body.day,
            ampere: req.body.ampere,
            volts: req.body.volt,
        });
        try {
            const savedState = await deviceState.save();
            console.log("[On Time Success]");
            return res.send("Success");
        } catch (err) {
            console.log("Error: " + err);
        }
    } else {
        let randId = Math.floor(Math.random() * 1000000);
        State.updateOne(
            { id: req.body.id },
            { $set: { id: randId, offtime: req.body.time } },
            (err) => {
                if (err) return res.status(400).send({ err: err });
                console.log("[Off Time Success]");
                return res.send("Success");
            }
        );
    }
};

exports.getLogs = async (req, res) => {
    try {
        const data = await State.find();
        console.log("All log data retrieved successfully!");
        return res.json(data);
    } catch (err) {
        console.log("Error: " + err);
        return res.status(400).send({ Error: "Server error" });
    }
};

exports.getDeviceInfo = async (req, res) => {
    try {
        const spokeId = req.body.spokeid;
        const hubId = req.body.hubid;
        console.log(spokeId, hubId);
        //* Query tested and working successfully! (HubId Not needed!)
        const spoke = await State.findOne({ spokeid: spokeId, hubid: hubId })
            .sort({ $natural: -1 })
            .limit(1);
        // console.log(spoke);
        console.log(`Spoke ${spoke.spokeid} value obtained`);
        return res.json(spoke);
    } catch (err) {
        return res.status(400).send({ Error: "Server error" });
    }
};

exports.getDashboardData = async (req, res) => {
    try {
        //! TEST THIS QUERY!
        // const devices = await Device.find({}).select("spokeid");
        devices = [1, 2];
        let onDevice = 0;
        let offDevice = 0;
        let idleDevice = 0;
        for (let id of devices) {
            let state = await State.findOne({ spokeid: id })
                .sort({ $natural: -1 })
                .limit(1);
            if (state.offtime === null) {
                onDevice++;
            } else if (state.ontime && state.offtime) {
                offDevice++;
            }
        }
        let spokes = await State.find({});
        const spokeData = [];
        spokes.forEach((spoke) => {
            spokeData.push({
                spokeid: spoke.spokeid,
                ontime: spoke.ontime,
                offtime: spoke.offtime,
                day: spoke.day,
                date: spoke.date,
            });
        });
        const result = {
            onDevice,
            offDevice,
            idleDevice,
            spokeData,
        };
        console.log("Daily data retrieved successfully!");
        return res.json(result);
    } catch (err) {
        return res.status(400).send({ Error: "Server Error" });
    }
};

exports.getDateSpecificInfo = async (req, res) => {
    let userDate = req.query.date;
    console.log(userDate);
    const mydata = await State.find({ date: userDate });
    console.log(mydata);
    return res.json(mydata);
};
