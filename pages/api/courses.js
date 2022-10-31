const Course = require("../../models/courses")
const dbConnect = require("../../utils/connectDB")

export default async function handler (req, res) {
    await dbConnect()
    if(req.method === "POST"){
        const course = new Course({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            status: req.body.status,
            date: req.body.date,
        })
        const courseAdded = await course.save()
    }else if(req.method === "GET"){
        const courses = await Course.find()
        // console.log(courses)
        res.send(courses)
    }
}