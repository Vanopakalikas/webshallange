const mongoose = require("mongoose")
const { Schema } = mongoose;

const user = new Schema({
    username: String,
    password: String,
    id: Number
});

module.exports = mongoose.model("User", user)