import Image from "next/image"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})

  return (
    <div className="font-main mb-20 flex flex-col items-center">
        <div ref={header}>
            <motion.div
            initial={{opacity: 0, scale: 0}}
            animate={isHeader && {opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className=" flex flex-col items-center mt-20"
            >
                <h1 className="text-4xl font-bold">About Us</h1>
                <div className="w-56 mt-2 flex items-center justify-center">
                    <div className="border-b-2 w-28 border-green"></div>
                    <div className='mx-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-28 border-green"></div>
                </div>
            </motion.div>
         </div>

         <div className="w-aboutWidth flex mt-20">
            <div className="flex-1 flex flex-col">
                <h1 className=" font-extrabold text-3xl">Dr Rehman Bashir</h1>
                <label className=" text-lg text-gray mt-2">GP consultant/MRCGP/CCT in General Practice.</label>
                <p className="mt-5 text-lg">Yes, I know my stuff! And throughout our coaching time, you will develop the tools and confidence to take action. My way of coaching is to empower you in becoming the Leader you want to be. You are unique and so your coaching should be too. I don’t follow a template, or ‘one size fits all’. We start where you are & we work towards your goals. If you want a business that generates you income while also positively contributing to others, then you have arrived at the right place!</p>
                <p className="mt-5 text-lg">Whether you have an existing business, or you’ve an idea that you want to bring to life, there is a way to create a positive triple bottom-line company: profit-people-planet all winning. No longer are these areas mutually exclusive, you can have it all and do good at the same time!</p>

            </div>

            <div className="flex-1 flex justify-end">
                <div className=" border-aboutPic border-green relative flex items-center justify-center h-aboutPic w-aboutPic">
                    <div className="absolute -top-12 bottom-0 -left-16">
                        <Image src="/images/Rehman Bashir.jpg" height={"550px"} width={"500px"} objectFit="cover"/>
                    </div>
                   
                </div>
            </div>
         </div>

         <div className="w-aboutWidth flex mt-36">
            <div className="flex-1 flex flex-col">
                <h1 className=" font-extrabold text-3xl">Dr Sohail Tariq</h1>
                <label className=" text-lg text-gray mt-2">Medicine Trainee in Health Education England/Working in NHS.</label>
                <p className="mt-5 text-lg">Yes, I know my stuff! And throughout our coaching time, you will develop the tools and confidence to take action. My way of coaching is to empower you in becoming the Leader you want to be. You are unique and so your coaching should be too. I don’t follow a template, or ‘one size fits all’. We start where you are & we work towards your goals. If you want a business that generates you income while also positively contributing to others, then you have arrived at the right place!</p>
                <p className="mt-5 text-lg">Whether you have an existing business, or you’ve an idea that you want to bring to life, there is a way to create a positive triple bottom-line company: profit-people-planet all winning. No longer are these areas mutually exclusive, you can have it all and do good at the same time!</p>

            </div>

            <div className="flex-1 flex justify-end">
                <div className=" border-aboutPic border-green relative flex items-center justify-center h-aboutPic w-aboutPic">
                    <div className="absolute -top-12 bottom-0 -left-16">
                        <Image src="/images/Rehman Bashir.jpg" height={"550px"} width={"500px"} objectFit="cover"/>
                    </div>
                   
                </div>
            </div>
         </div>
    </div>
  )
}

export default About