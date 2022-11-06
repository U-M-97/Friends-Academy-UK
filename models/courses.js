const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
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
    date:{
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
})

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema)
module.exports = Course