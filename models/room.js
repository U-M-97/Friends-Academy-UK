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
                date: {
                    type: Number
                },
                month: {
                    type: Number
                }, 
                year: {
                    type: Number
                }
            },
            checkOut: {
                date: {
                    type: Number
                },
                month: {
                    type: Number
                }, 
                year: {
                    type: Number
                }
            },
            bed: {
                type: String
            },
            payment: {
                type: Number
            }
        }
    ]

})

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema)
module.exports = Room