const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    spokeid: {
        type: String,
        required: true,
    },
    hubid: {
        type: String,
        required: true,
    },
    devicename: {
        type: String,
        required: true,
    },
    volt: {
        type: String,
        required: true,
    },
    ampere: {
        type: String,
        required: true,
    },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
