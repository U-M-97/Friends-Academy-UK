const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    googleId: {
        type: Number
    },
    facebookId: {
        type: Number
    },
    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/456/456212.png"
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})

const User = mongoose.models.User || mongoose.model("User", userSchema)
module.exports = User