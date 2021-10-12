const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    jobList: [{
        type: Object,
        required: false
    }],
    latitude: {
        type: String,
        required: [true, "please provide proper latitude"]
    },
    longitude: {
        type: String,
        required: [true, "please provide proper longitude"]
    },
});

const City = mongoose.model("Cities", citiesSchema);
module.exports = City;