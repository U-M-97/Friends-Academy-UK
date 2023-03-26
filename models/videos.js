const mongoose = require("mongoose")
const User = require("./user")

const videoSchema = new mongoose.Schema({
    access: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        time: {
            type: Date,
            default: Date.now
        }
    }],
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true }
)

const Video = mongoose.models.Video || mongoose.model("Video", videoSchema)
module.exports = Video