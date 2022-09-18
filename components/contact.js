import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contact = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})

  return (
    <div className="pb-20 flex font-main items-center justify-center bg-servicesBG">
        <div className='w-width flex'>
            <div className="flex-1 flex flex-col ml-40">
                <div className='flex flex-col'>
                    <div ref={header}>
                        <motion.div
                        initial={{opacity: 0, scale: 0}}
                        animate={isHeader && {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}}
                        className=" flex flex-col items-start mt-20"
                        >
                            <h1 className="text-4xl font-bold">Address</h1>
                            <div className="w-40 mt-2 flex items-center justify-start">
                                <div className='mr-3'>
                                    <div className="h-2 w-2 rounded-full bg-pink"></div>
                                </div>  
                                <div className="border-b-2 w-40 border-green"></div>
                            </div>
                        </motion.div>
                    </div>

                    <label className='text-lg mt-12'>113-115 Smedley Road Manchester M8 0RS</label>
                    <div className='mt-10'>
                        <PhoneIcon className='text-green scale-125'/>
                        <label className='ml-4 text-xl'>+ 00 4475 32707561</label>
                    </div>
                    <div className='mt-4'>
                        <MailIcon className='text-green scale-125'/>
                        <label className='ml-4 text-xl'>mail@domain.com</label>
                    </div>
                    <div className='mt-4'>
                        <LocationOnIcon className='text-green scale-125'/>
                        <label className='ml-4 text-xl'>113-115 Smedley Road Manchester M8 0RS</label>
                    </div>

                    <div className='mt-10 flex'>
                        <div className=' h-14 w-14 border border-lightGray rounded-full flex items-center justify-center ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <WhatsAppIcon className=''/>
                        </div>
                        <div className=' h-14 w-14 border border-lightGray rounded-full flex items-center justify-center ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <FacebookIcon className=''/>
                        </div>
                        <div className=' h-14 w-14 border border-lightGray rounded-full flex items-center justify-center ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <YouTubeIcon className=''/>
                        </div>
                        <div className=' h-14 w-14 border border-lightGray rounded-full flex items-center justify-center ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <TwitterIcon className=''/>
                        </div>
                        <div className='h-14 w-14 border border-lightGray rounded-full flex items-center justify-center ml-4 text-green hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <InstagramIcon className=''/>
                        </div>
                    </div>
                </div>     
            </div>

            <div className="flex-1 flex flex-col mr-40">
                <div ref={header}>
                    <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={isHeader && {opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className=" flex flex-col items-start mt-20"
                    >
                        <h1 className="text-4xl font-bold">Request a Consultation</h1>
                        <div className="w-40 mt-2 flex items-center justify-start">
                            <div className='mr-3'>
                                <div className="h-2 w-2 rounded-full bg-pink"></div>
                            </div>  
                            <div className="border-b-2 w-40 border-green"></div>
                        </div>
                    </motion.div>
                </div>

                <div>
                    <p className='text-lg mt-12'>If you have any questions or just want to get in touch, use the form below. I look forward to hearing from you! You can get in touch with me directly at <a href="" className='text-green underline'>hello@domain.com.</a></p>
                    <input className='p-2 w-full border border-green rounded-sm mt-5 text-lg' placeholder='Name'/>
                    <input className='p-2 w-full border border-green rounded-sm mt-5 text-lg' placeholder='Email'/>
                    <textarea className='p-2 pb-20 w-full border border-green rounded-sm mt-5 text-lg' placeholder='Message'/>
                    <button className='w-full bg-pink mt-5 p-4 rounded-md text-white font-bold hover:bg-green duration-300'>Send Message</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Contact