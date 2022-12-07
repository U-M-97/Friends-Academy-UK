const Course = require("../../models/courses")
const dbConnect = require("../../utils/connectDB")

export default async function handler (req, res) {
    await dbConnect()
    if(req.method === "POST"){
        const {title, description, category, price, status, startDate, endDate} = req.body.inputs
        console.log()
        const url = req.body.url
        const course = new Course({
            image: url,
            title: title,
            description: description,
            category: category,
            price: price,
            status: status,
            startDate: startDate,
            endDate: endDate
        })
        const courseAdded = await course.save()
    }else if(req.method === "GET"){
        const courses = await Course.find()
        res.send(courses)
    }else if (req.method === "PUT"){
        const { id, image, title, description, category, price, status, startDate, endDate } = req.body

        try{
            const course = await Course.findByIdAndUpdate({_id: id}, {
                image: image,
                title: title,
                description: description,
                category: category,
                price: price,
                status: status,
                startDate: startDate,
                endDate: endDate
            })
            res.send("Course Updated Successfully")
        }catch(err){
            res.send(err)
        } 
    }
    else if(req.method === "DELETE"){
        const id = req.body
        try{
            const delCourse = await Course.findByIdAndDelete(id)
            if(delCourse){
                res.send("Course Deleted Successfully")
            }
        }catch(err){
            res.send(err)
        }
    }
}