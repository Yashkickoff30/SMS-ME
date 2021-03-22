const router = require("express").Router();

router.post("/", async (req, res) => {
    if (req.body.state == 1) {
        const deviceState = new State({
            id: req.body.id,
            deviceid: req.body.deviceid,
            hubid: req.body.hubid,
            ontime: req.body.time,
            date: req.body.date,
            day: req.body.day,
        });
        try {
            const savedState = await deviceState.save();
            console.log("[On Time Success]");
            return res.send("Success");
        } catch (err) {
            console.log("Error: " + err);
        }
    } else {
        State.updateOne(
            { id: req.body.REQUESTNO },
            { $set: { id: randId, offtime: req.body.TIME } },
            (err) => {
                if (err) return res.status(400).send(err);
                console.log("[Off Time Success]");
                return res.send("Success");
            }
        );
    }
});

module.exports = router;
