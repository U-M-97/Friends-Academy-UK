import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Testimonials = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})

  return (
    <div className='font-main h-screen flex justify-center bg-servicesBG'>
        <div ref={header}>
            <motion.div
            initial={{opacity: 0, scale: 0}}
            animate={isHeader && {opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className=" flex flex-col items-center mt-20"
            >
                <h1 className="text-3xl sm:text-4xl font-bold">Trusted By</h1>
                <div className="w-56 mt-2 flex items-center justify-center">
                    <div className="border-b-2 w-28 border-green"></div>
                    <div className='mx-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-28 border-green"></div>
                </div>
            </motion.div>
         </div>

         
    </div>
  )
}

export default Testimonials