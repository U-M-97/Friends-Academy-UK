const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title:{
        type: String
    },
    description:{
        type: String
    },
    category:{
        type: String
    },
    price:{
        type: String
    },
    status:{
        type: String
    },
    courseStudents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }      
    ],
    startDate:{
        type: String
    },
    endDate: {
        type: String
    },
    schedule: [
        {
         day: {
             type: String
         },
         time: {
             type: String
         }
        }
     ],
     Instructors: [
        {
            name: {
                type: String
            }
        }
     ],
},
)

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema)
module.exports = Course