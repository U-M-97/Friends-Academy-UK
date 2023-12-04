const Course = require("../../models/courses");
const dbConnect = require("../../utils/connectDB");
const verifyToken = require("./verifyToken");

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    console.log(req.query);

    if (req.query.type === "get all courses") {
      const courses = await Course.find().sort({ createdAt: -1 });
      res.send(courses);
    } else {
      const courses = await Course.find({
        $or: [{ status: "active" }, { status: "Active" }],
      }).sort({ category: 1, startDate: 1 });
      res.send(courses);
    }
  } else {
    const role = "admin";
    const tokenCheck = await verifyToken(req, role);

    if (tokenCheck === "Token is not Present") {
      return res.send("Token is not Present");
    }

    if (tokenCheck === "Token is not Valid") {
      return res.send("Token is not Valid");
    }

    if (tokenCheck === "Allowed") {
      if (req.method === "POST") {
        const {
          title,
          tagline,
          description,
          category,
          price,
          status,
          startDate,
          endDate,
        } = req.body.inputs;

        let url = "";
        if (category === "Plab-2 Full Course") {
          url = "/images/Friends Academy.png";
        } else if (category === "Mini Mocks") {
          url = "/images/Friends Academy logo.png";
        } else if (category === "Plab-2 High Yield Course") {
          url = "/images/main.jpg";
        } else if (category === "Plab-2 High Yield with Mock") {
          url = "/images/Friends Academy logo.png";
        } else if (category === "Plab-2 Mock") {
          url = "/images/Friends Academy logo.png";
        }

        const course = new Course({
          image: url,
          title: title,
          tagline: tagline,
          description: description,
          category: category,
          price: price,
          status: status,
          startDate: startDate,
          endDate: endDate,
        });
        const courseAdded = await course.save();

        res.send("Course Added Successfully");
      } else if (req.method === "PUT") {
        const {
          id,
          image,
          title,
          tagline,
          description,
          category,
          price,
          status,
          startDate,
          endDate,
        } = req.body;

        try {
          const course = await Course.findByIdAndUpdate(
            { _id: id },
            {
              image: image,
              title: title,
              tagline: tagline,
              description: description,
              category: category,
              price: price,
              status: status,
              startDate: startDate,
              endDate: endDate,
            }
          );
          res.send("Course Updated Successfully");
        } catch (err) {
          res.send(err);
        }
      } else if (req.method === "DELETE") {
        const id = req.body;
        try {
          const delCourse = await Course.findByIdAndDelete(id);
          if (delCourse) {
            res.send("Course Deleted Successfully");
          }
        } catch (err) {
          res.send(err);
        }
      }
    }
  }
}
