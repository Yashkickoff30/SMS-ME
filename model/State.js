const mongoose = require("mongoose");
// Todo: Decide the type of Ampere, Volt values!
const stateSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    spokeid: {
        type: String,
        required: true,
    },
    hubid: {
        type: String,
        required: true,
    },
    ontime: {
        type: String,
        required: true,
    },
    offtime: {
        type: String,
    },
    ampere: {
        type: String,
    },
    volts: {
        type: String,
    },
    isIdle: {
        type: Boolean,
    },
    date: {
        type: String,
    },
    day: {
        type: String,
    },
});

const State = mongoose.model("State", stateSchema);

module.exports = State;
