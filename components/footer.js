import Image from "next/image"
import CopyrightIcon from '@mui/icons-material/Copyright';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <div className="bg-black flex flex-col items-center justify-center">
        <div className="flex w-aboutWidth mt-20">
            <div className="flex-1 mr-5">
                <Image src="/images/Friends Academy.png" height={"100px"} width={"200px"} objectFit="cover"/>
                <p className="text-white text-lg mt-2">Coaching is a form of development in which a person called a coach supports a learner or client in achieving a specific personal or professional goal by providing training and guidance. The learner is sometimes called a coachee.</p>
            </div>
            <div className="flex-1 mr-5">
                <h1 className="text-white text-2xl">Events</h1>
                <div className="mt-2  flex items-center justify-start">
                    <div className='mr-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-20 border-green"></div>
                </div>
            </div>
            <div className="flex-1  mr-5 ">
                <h1 className="text-white text-2xl">Contact Us</h1>
                <div className="mt-2  flex items-center justify-start">
                    <div className='mr-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-20 border-green"></div>
                </div>
                <div className='mt-10'>
                    <PhoneIcon className='text-green scale-125'/>
                    <a className='ml-4 text-xl text-white hover:underline hover:text-green duration-300 cursor-pointer'>+ 00 4475 32707561</a>
                </div>
                <div className='mt-4'>
                    <MailIcon className='text-green scale-125'/>
                    <label className='ml-4 text-xl text-white hover:underline hover:text-green duration-300 cursor-pointer'>mail@domain.com</label>
                </div>
                <div className='mt-4 flex items-center'>
                    <LocationOnIcon className='text-green scale-125'/>
                    <div className="ml-4 ">
                        <p className='text-xl text-white'>113-115 Smedley Road Manchester M8 0RS</p>
                    </div>    
                </div>
                <div className='mt-10 flex'>
                        <div className=' h-10 w-10 border border-lightGray rounded-full flex items-center justify-center text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <WhatsAppIcon className=''/>
                        </div>
                        <div className=' h-10 w-10  border border-lightGray rounded-full flex items-center justify-center ml-4 text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <FacebookIcon className=''/>
                        </div>
                        <div className=' h-10 w-10  border border-lightGray rounded-full flex items-center justify-center ml-4 text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <YouTubeIcon className=''/>
                        </div>
                        <div className='h-10 w-10  border border-lightGray rounded-full flex items-center justify-center ml-4 text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <TwitterIcon className=''/>
                        </div>
                        <div className='h-10 w-10  border border-lightGray rounded-full flex items-center justify-center ml-4 text-white hover:text-white cursor-pointer hover:bg-green duration-300'>
                            <InstagramIcon className=''/>
                        </div>
                </div>
            </div>
            <div className="flex-1 mr-5">
                <h1 className="text-white text-2xl">Popular</h1>
                <div className="mt-2  flex items-center justify-start">
                    <div className='mr-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>  
                    <div className="border-b-2 w-20 border-green"></div>
                </div>
            </div>
        </div>
        <div className=" border-t-footer border-gray w-full mt-14"></div>
        <div className="text-lightGray my-5 flex">
            <CopyrightIcon/>
            <p className="ml-2">Copyright 2022 <a className="text-green">Friends Academy</a> All Rights Reserved. Freinds Academy | Developed By <a className="text-green">Usama Maqsood.</a></p>
        </div>
    </div>
  )
}

export default Footer