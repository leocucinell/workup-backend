const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide a username"]
    },
    email: {
        type: String,
        required: [true, "please provide a username"]
    },
    password: {
        type: String,
        required: [true, "please provide a password"]
    },
    mainCity: {
        type: String,
        required: [true, "please provide a username"]
    },
    jobPostings: [{
        type: Object,
        required: false
    }]
});
//add time stamps!!!

const User = mongoose.model("Users", userSchema);
module.exports = User