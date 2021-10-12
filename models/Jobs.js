const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: [true, "please provide a job id"]
    },
    title: {
        type: String,
        required: [true, "please provide a job title"]
    },
    description: {
        type: String,
        required: [true, "please provide a job description"]
    },
    author: {
        type: String,
        required: [true, "please provide a job author"]
    },
    streetAddress: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: [true, "please provide a city for this job"]
    },
    date: {
        type: Date,
        required: [true, "please provide a  date"]
    },
    spots: {
        type: Number,
        required: [true, "please provide a number of job spots"]
    },
    filled_spots: [{
        type: String,
        required: false
    }],
    jobPurpose: {
        type: String,
        required: [true, "please provide a purpose to this job"]
    },
});

const Job = mongoose.model("Job", jobsSchema);
module.exports = Job