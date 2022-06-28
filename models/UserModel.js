const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName : String,
    email : String,
    password : String
});

module.exports = new mongoose.model("User", UserSchema);