import { useState } from "react"
import axios from "axios"

const addCourses = () => {

    const [ inputs, setInputs ] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        status: "",
        courseStudents: "",
        date: "",
        schedule: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs((prev) => ({
            ...prev, [name]:value
        }))
    }
    console.log(inputs)

    const handleSubmit = () => {
        axios.post("http://localhost:3000/api/courses", inputs)

    }

  return (
    <div className="flex flex-col">
        <input placeholder="title" className="p-5 my-5 border border-black w-60 " name="title"  onChange={handleChange}/>
        <input placeholder="description" className="p-5 my-5 border border-black w-60" name="description" onChange={handleChange}/>
        <input placeholder="category" className="p-5 my-5 border border-black w-60" name="category" onChange={handleChange}/>
        <input placeholder="price" className="p-5 my-5 border border-black w-60" name="price" onChange={handleChange}/>
        <input placeholder="status" className="p-5 my-5 border border-black w-60" name="status" onChange={handleChange}/>
        <input placeholder="courseStudents" className="p-5 my-5 border border-black w-60" name="courseStudents" onChange={handleChange}/>
        <input placeholder="date" className="p-5 my-5 border border-black w-60" name="date" onChange={handleChange}/>
        <input placeholder="schedule" className="p-5 my-5 border border-black w-60" name="schedule" onChange={handleChange}/>
        <button className="bg-green p-5 text-2xl w-60" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default addCourses