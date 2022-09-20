import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import WifiIcon from '@mui/icons-material/Wifi';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Accommodation = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
    const {ref: accommodation, inView: isAccommodation} = useInView({triggerOnce: true})
    const {ref: accommodation2, inView: isAccommodation2} = useInView({triggerOnce: true})

    const container = {
        visible: {
            transition: {
                staggerChildren: 0.2,
            }
        }
    }

    const item = {
        hidden:{
            x: -480,
        },
        visible:{
            x: 0,
            transition: {
                duration: 0.5,
            }
        }     
    }

    const item2 = {
        hidden:{
            x: 480,
        },
        visible:{
            x: 0,
            transition: {
                duration: 0.5,
            }
        }     
    }

  return (
    <div className='font-main flex flex-col items-center overflow-x-hidden'>
        <div ref={header}>
            <motion.div
            initial={{opacity: 0, scale: 0}}
            animate={isHeader && {opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className=" flex flex-col items-center mt-20"
            >
                <h1 className="text-4xl font-bold">Accommodation</h1>
                <div className="w-56 mt-2 flex items-center justify-center">
                    <div className="border-b-2 w-28 border-green"></div>
                    <div className='mx-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-28 border-green"></div>
                </div>
            </motion.div>
         </div>

         <div className='flex w-full mt-10 h-accommodation'>
            <div ref={accommodation} className='w-2/4 bg-black text-white flex items-center justify-center'>
                <motion.div className='flex flex-col justify-center' 
                variants={container}
                initial="hidden"
                animate={isAccommodation && "visible"}
                >
                    <motion.h1 variants={item} className='text-4xl font-medium'>Single Rooms</motion.h1>
                    <motion.p variants={item} className='text-xl mt-4'>GB 25.00 per person per night</motion.p>
                    <motion.div variants={item} className='flex items-center mt-6'>
                        <HomeIcon className=' scale-125'/>
                        <p className='ml-4 text-lg'>Onsite Accommodation Available</p>
                    </motion.div>
                    <motion.div variants={item} className='flex items-center mt-4'>
                        <WifiIcon/>
                        <p className='ml-4 text-lg'>Free Wifi</p>
                    </motion.div>
                    <motion.div variants={item} className='flex items-center mt-4'>
                        <DirectionsCarIcon className=' scale-125'/>
                        <p className='ml-4 text-lg'>Only 8 Minutes Drive to GMC Building</p>
                    </motion.div>
                    <motion.div variants={item} className='flex items-center mt-4'>
                        <LocalMallIcon className=' scale-125'/>
                        <p className='ml-4  text-lg'>All Local Amenities Nearby</p>
                    </motion.div>
                    <motion.div variants={item} className='flex items-center mt-4'>
                        <RestaurantIcon className=' scale-125'/>
                        <p className='ml-4 text-lg'>Halal Food At Walking Distance</p>
                    </motion.div> 
                </motion.div>
            </div>

            <div className=' w-3/4 relative'>
                <Image src="/images/accommodation1.jpg" layout='fill' objectFit='cover'/>
            </div>
         </div>

         <div className='flex w-full h-accommodation'>
            <div className=' w-3/4 relative'>
                <Image src="/images/accommodation.jpg" layout='fill' objectFit='cover'/>
            </div>

            <div ref={accommodation2} className='w-2/4 bg-white flex justify-center items-center'>
                <motion.div
                variants={container}
                initial="hidden"
                animate={isAccommodation2 && "visible"}
                className='flex flex-col justify-center'>
                    <motion.h1 variants={item2} className='text-4xl font-medium'>Double Rooms</motion.h1>
                    <motion.p variants={item2} className='text-xl mt-4'>GB 20.00 per person per night</motion.p>
                    <motion.div variants={item2} className='flex items-center mt-6'>
                        <HomeIcon className=' scale-125'/>
                        <p className='ml-4 text-lg'>Onsite Accommodation Available</p>
                    </motion.div>
                    <motion.div variants={item2} className='flex items-center mt-4'>
                        <WifiIcon/>
                        <p className='ml-4 text-lg'>Free Wifi</p>
                    </motion.div>
                    <motion.div variants={item2} className='flex items-center mt-4'>
                        <DirectionsCarIcon className=' scale-125'/>
                        <p className='ml-4 text-lg'>Only 8 Minutes Drive to GMC Building</p>
                    </motion.div>
                    <motion.div variants={item2} className='flex items-center mt-4'>
                        <LocalMallIcon className=' scale-125'/>
                        <p className='ml-4  text-lg'>All Local Amenities Nearby</p>
                    </motion.div>
                    <motion.div variants={item2} className='flex items-center mt-4'>
                        <RestaurantIcon className=' scale-125'/>
                        <p className='ml-4 text-lg'>Halal Food At Walking Distance</p>
                    </motion.div> 
                </motion.div>
            </div>
         </div>
    </div>
  )
}

export default Accommodation