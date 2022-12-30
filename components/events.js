import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/router';
import { selectCourse } from "../redux/courseReducer"

const Events = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
    const courses = useSelector((state) => state.course.currentCourses)
    const user = useSelector((state) => state.user.currentUser)
    const [ selectedCategory, setSelectedCategory ] = useState()
    let categories = []

    courses && courses.map((course) => {
        categories.push(course.category)
    })

    const uniqueCategory = categories.filter((item, index) => categories.indexOf(item) === index)
    console.log(uniqueCategory)
    // courses && courses.map((item) => {
    //     if(item.category != tmp){
    //         categories.push(item.category)
    //         tmp = item.category
    //         return  
    //     }
    // })

    useEffect(() => {
        setSelectedCategory(courses[1].category)
    }, [courses])

    const handleSelectedCourse = (course) => {
        dispatch(selectCourse(course))
        if(!user){
            router.push("/account/login")
        }else{
            router.push("/course")
        } 
    }
    
  return (
    <div className='font-main flex flex-col items-center justify-center pb-10 bg-green' id='bookOnline'>
        <div ref={header}>
            <motion.div
            initial={{opacity: 0, scale: 0}}
            animate={isHeader && {opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className=" flex flex-col items-center mt-20"
            >
                <h1 className="text-3xl sm:text-4xl font-bold">Our Events and Courses</h1>
                <div className="w-56 mt-2 flex items-center justify-center">
                    <div className="border-b-2 w-28 border-white"></div>
                    <div className='mx-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-28 border-white"></div>
                </div>
            </motion.div>
         </div>

         <div className='w-80 sm:w-aboutWidth mt-8 flex flex-col sm:flex-row justify-center sm:flex-wrap'>
            {uniqueCategory && uniqueCategory.map((item) => {
                return(
                    <>
                        <div key={item} className={`w-full sm:w-auto border p-2 mr-3 mt-2 rounded-md cursor-pointer bg-white border-black hover:bg-pink hover:border-green duration-300 font-semibold text-lg hover:text-white ${item == selectedCategory ? "bg-pink text-white" : null} `} onClick={() => setSelectedCategory(item)}>
                            <p>{item}</p>
                        </div>
                        <div className='sm:hidden'>
                            {courses && courses.map((course) => {
                                return(
                                    course.category == selectedCategory && item == selectedCategory ? 
                                    <div className='mt-8 rounded-lg flex bg-white shadow-lg'>
                                        <div className='rounded-l-lg border-l-8 border-pink flex flex-col py-4 px-2'>
                                            <div className='flex flex-col items-center'>
                                                <div className=''>
                                                    <Image src={course.image} height="120px" width="120px" objectFit='cover' className='rounded-full'/>
                                                </div>       
                                                <div className='mt-5 px-5 flex flex-col items-center justify-center'>
                                                    <div className='flex flex-col items-center'>
                                                        <p className='text-3xl font-bold text-black'>{course.title}</p>
                                                        <p className=' mt-3 font-extrabold text-xs bg-pink rounded-lg py-important px-1 text-center text-white'>NEW!</p>
                                                        <p className=' mt-3 font-extrabold text-xs bg-black rounded-lg py-important px-1 text-center text-white'>FEATURED!</p>
                                                    </div>
                                                    <p className='text-2xl font-bold mt-2'>{course.description}</p> 
                                                    <p className='text-gray mt-2'>Turkey Only</p>
                                                    <a href='' className='underline hover:text-green duration-300'>Read More</a>
                                                </div>
                                            </div>

                                            <div className='flex flex-col items-center'>
                                                <div className='flex mt-5 items-center'>
                                                    <h1 className='text-2xl font-bold'>Price</h1>
                                                    <p className='ml-5 text-2xl'>£{course.price}</p>
                                                </div>
                                                <div className='flex mt-3 items-center'>
                                                    <h1 className='text-2xl font-bold'>Status</h1>
                                                    <p className={`ml-5 text-md  text-white text-center rounded-lg ${course.status == "active" ? "bg-green" : "bg-red-600"}`}>{course.status}</p>
                                                </div>
                                                <div className='mt-3 mr-5 flex items-center' onClick={() => handleSelectedCourse(course)}>
                                                    <button className='bg-pink text-white py-3 px-8 rounded-3xl text-lg font-semibold hover:bg-green duration-300 hover:text-black'>View Course</button>
                                                </div>  
                                            </div>
                                             
                                        </div>          
                                </div>
                                    : null
                                )
                            })}
                        </div>
                       
                    </>
                   
                )   
            })}
         </div>
        
        <div className='hidden sm:inline-block sm:h-aboutPic sm:overflow-auto sm:px-4 sm:py-2 sm:mt-4'>
            {courses && courses.map((item) => {
                return(
                item.category == selectedCategory ?  
                <div className=' mt-8 rounded-lg flex bg-white shadow-lg'>
                    <div className='rounded-l-lg border-l-8 border-pink flex py-4 px-2'>
                        <div className='flex items-center'>
                            <div className='ml-3'>
                                <Image src={item.image} height="120px" width="120px" objectFit='cover' className='rounded-full'/>
                            </div>       
                            <div className='ml-4 w-aboutPic'>
                                <div className='flex items-center'>
                                    <p className='text-3xl font-bold text-black'>{item.title}</p>
                                    <p className='ml-3 font-extrabold text-xs bg-pink rounded-lg py-important px-1 text-center text-white'>NEW!</p>
                                    <p className='ml-3 font-extrabold text-xs bg-black rounded-lg py-important px-1 text-center text-white'>FEATURED!</p>
                                </div>
                                <p className='text-2xl font-bold mt-2'>{item.description}</p> 
                                {/* <p className='text-gray mt-2'>Turkey Only</p> */}
                                <a href='' className='underline hover:text-green duration-300'>Read More</a>
                            </div>
                        </div>
            
                        <div className='ml-16'>
                            <h1 className='text-2xl font-bold'>Price</h1>
                            <p className='mt-5 text-2xl'>£{item.price}</p>
                        </div>
                        <div className='ml-16'>
                            <h1 className='text-2xl font-bold'>Status</h1>
                            <p className={`mt-5 text-md  text-white text-center rounded-lg ${item.status == "active" || "Active" ? "bg-green" : "bg-red-600"}`}>{item.status}</p>
                        </div>
                        <div className='ml-16 mr-5 flex items-center' onClick={() => handleSelectedCourse(item)}>
                            <button className='bg-pink text-white py-3 px-8 rounded-3xl text-lg font-semibold hover:bg-green duration-300 hover:text-black'>Book This Course</button>
                        </div>    
                    </div>          
                </div>
                : null
                )
            })}
        </div>       
    </div>
  )
}

export default Events