const Course = require("../../models/courses")
const dbConnect = require("../../utils/connectDB")

export default async function handler (req, res) {
    await dbConnect()
    if(req.method === "POST"){
        const {title, description, category, price, status, courseStudents, date, schedule} = req.body.inputs
        const url = req.body.url
        const course = new Course({
            image: url,
            title: title,
            description: description,
            category: category,
            price: price,
            status: status,
            date: date,
        })
        const courseAdded = await course.save()
    }else if(req.method === "GET"){
        const courses = await Course.find()
        res.send(courses)
    }
}