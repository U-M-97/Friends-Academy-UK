const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    roomTitle: {
        type: String
    },
    image: {
        type: String
    },
    roomType: {
        type: String
    },
    roomBeds: {
        type: Number
    },
    roomMembers: [
        {
            name: {
                type: String
            }, 
            gender: {
                type: String
            },
            phone: {
                type: String
            },
            country: {
                type: String
            },
            email: {
                type: String
            },
            checkIn: {
                type: String
            },
            checkOut: {
                type: String
            },
            bed: {
                type: String
            },
            payment: {
                type: Number
            }
        }
    ]

}, { timestamps: true }
)

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema)
module.exports = Room