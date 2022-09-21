import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState } from 'react';

const Events = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
    const [course, setCourse] = useState(true)
    
  return (
    <div className='font-main flex flex-col items-center justify-center pb-10 bg-green'>
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

         <div className='w-80 sm:w-aboutWidth mt-10 flex flex-col sm:flex-row justify-center'>
            <div className='w-full sm:w-auto border p-2 mr-5 rounded-md cursor-pointer bg-white border-black hover:bg-pink hover:border-green duration-300 font-semibold text-lg hover:text-white' onClick={() => setCourse(true)}>
                <p>Plab-2 Overseas</p>
            </div>
            <div className='mt-3 sm:mt-0 w-full sm:w-auto border p-2 mr-5 rounded-md cursor-pointer bg-white border-black hover:bg-pink hover:border-green duration-300 font-semibold text-lg hover:text-white' onClick={() => setCourse(false)}>
                <p>Plab-2 Full Course</p>
            </div>
            <div className='mt-3 sm:mt-0 w-full sm:w-auto border p-2 mr-5 rounded-md cursor-pointer bg-white border-black hover:bg-pink hover:border-green duration-300 font-semibold text-lg hover:text-white'>
                <p>Plab-2 Mock</p>
            </div>
            <div className='mt-3 sm:mt-0 w-full sm:w-auto border p-2 mr-5 rounded-md cursor-pointer bg-white border-black hover:bg-pink hover:border-green duration-300 font-semibold text-lg hover:text-white'>
                <p>Plab-2 High Yield Course</p>
            </div>
            <div className='mt-3 sm:mt-0 w-full sm:w-auto border p-2 mr-5 rounded-md cursor-pointer bg-white border-black hover:bg-pink hover:border-green duration-300 font-semibold text-lg hover:text-white'>
                <p>Plab-2 High Yield with Mock</p>
            </div>
            <div className='mt-3 sm:mt-0 w-full sm:w-auto border p-2 mr-5 rounded-md cursor-pointer bg-white border-black hover:bg-pink hover:border-green duration-300 font-semibold text-lg hover:text-white'>
                <p>Mini Mocks</p>
            </div>
         </div>
        
        <div className='hidden sm:inline-block sm:h-aboutPic sm:overflow-auto sm:px-4 sm:py-2 sm:mt-4'>
        {course == true ? 
        <div className=' mt-8 w-aboutWidth rounded-lg flex bg-white shadow-lg'>
        <div className='rounded-l-lg border-l-8 border-pink flex py-4 px-2'>
            <div className='flex items-center'>
                <div className='ml-3'>
                    <Image src="/images/Turkey.jpg" height="120px" width="120px" objectFit='cover' className='rounded-full'/>
                </div>       
                <div className='ml-4'>
                    <div className='flex items-center'>
                    <p className='text-3xl font-bold text-black'>Plab-2 Turkey</p>
                    <p className='ml-3 font-extrabold text-xs bg-pink rounded-lg py-important px-1 text-center text-white'>NEW!</p>
                    <p className='ml-3 font-extrabold text-xs bg-black rounded-lg py-important px-1 text-center text-white'>FEATURED!</p>
                    </div>
                    <p className='text-2xl font-bold mt-2'>Multiple Online / Onsite Courses in UK / 4 Mocks</p> 
                    <p className='text-gray mt-2'>Turkey Only</p>
                    <a href='' className='underline hover:text-green duration-300'>Read More</a>
                </div>
            </div>
            
            <div className='ml-16'>
                <h1 className='text-2xl font-bold'>Price</h1>
                <p className='mt-5 text-2xl'>£650</p>
            </div>
            <div className='ml-16'>
                <h1 className='text-2xl font-bold'>Status</h1>
                <p className='mt-5 text-md bg-red-600 text-white text-center rounded-lg'>Ended</p>
            </div>
            <div className='ml-16 flex items-center'>
                <button className='bg-pink text-white py-3 px-8 rounded-3xl text-lg font-semibold hover:bg-green duration-300 hover:text-black'>View Course</button>
            </div>
        </div>          
     </div>
     :
     <>
        <div className=' mt-8 w-aboutWidth rounded-lg flex bg-white shadow-lg'>
        <div className='rounded-l-lg border-l-8 border-pink flex py-4 px-2'>
            <div className='flex items-center'>
                <div className='ml-3'>
                    <Image src="/images/Turkey.jpg" height="120px" width="120px" objectFit='cover' className='rounded-full'/>
                </div>       
                <div className='ml-4'>
                    <div className='flex items-center'>
                    <p className='text-3xl font-bold text-black'>Plab-2 Turkey</p>
                    <p className='ml-3 font-extrabold text-xs bg-pink rounded-lg py-important px-1 text-center text-white'>NEW!</p>
                    <p className='ml-3 font-extrabold text-xs bg-black rounded-lg py-important px-1 text-center text-white'>FEATURED!</p>
                    </div>
                    <p className='text-2xl font-bold mt-2'>Multiple Online / Onsite Courses in UK / 4 Mocks</p> 
                    <p className='text-gray mt-2'>Turkey Only</p>
                    <a href='' className='underline hover:text-green duration-300'>Read More</a>
                </div>
            </div>
            
            <div className='ml-16'>
                <h1 className='text-2xl font-bold'>Price</h1>
                <p className='mt-5 text-2xl'>£650</p>
            </div>
            <div className='ml-16'>
                <h1 className='text-2xl font-bold'>Status</h1>
                <p className='mt-5 text-md bg-red-600 text-white text-center rounded-lg'>Ended</p>
            </div>
            <div className='ml-16 flex items-center'>
                <button className='bg-pink text-white py-3 px-8 rounded-3xl text-lg font-semibold hover:bg-green duration-300 hover:text-black'>View Course</button>
            </div>
        </div>          
     </div>
     <div className=' mt-8 w-aboutWidth rounded-lg flex bg-white shadow-lg'>
        <div className='rounded-l-lg border-l-8 border-pink flex py-4 px-2'>
            <div className='flex items-center'>
                <div className='ml-3'>
                    <Image src="/images/Turkey.jpg" height="120px" width="120px" objectFit='cover' className='rounded-full'/>
                </div>       
                <div className='ml-4'>
                    <div className='flex items-center'>
                    <p className='text-3xl font-bold text-black'>Plab-2 Turkey</p>
                    <p className='ml-3 font-extrabold text-xs bg-pink rounded-lg py-important px-1 text-center text-white'>NEW!</p>
                    <p className='ml-3 font-extrabold text-xs bg-black rounded-lg py-important px-1 text-center text-white'>FEATURED!</p>
                    </div>
                    <p className='text-2xl font-bold mt-2'>Multiple Online / Onsite Courses in UK / 4 Mocks</p> 
                    <p className='text-gray mt-2'>Turkey Only</p>
                    <a href='' className='underline hover:text-green duration-300'>Read More</a>
                </div>
            </div>
            
            <div className='ml-16'>
                <h1 className='text-2xl font-bold'>Price</h1>
                <p className='mt-5 text-2xl'>£650</p>
            </div>
            <div className='ml-16'>
                <h1 className='text-2xl font-bold'>Status</h1>
                <p className='mt-5 text-md bg-red-600 text-white text-center rounded-lg'>Ended</p>
            </div>
            <div className='ml-16 flex items-center'>
                <button className='bg-pink text-white py-3 px-8 rounded-3xl text-lg font-semibold hover:bg-green duration-300 hover:text-black'>View Course</button>
            </div>
        </div>          
     </div>
     </>
     }
        </div>
        
         
    </div>
  )
}

export default Events