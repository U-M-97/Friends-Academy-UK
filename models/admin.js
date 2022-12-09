const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema)
module.exports = Admin