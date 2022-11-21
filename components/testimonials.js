import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from "next/image"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import style from "../styles/testimonials.module.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle"
import { Navigation, Pagination, Scrollbar, A11y  } from 'swiper';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';

const Testimonials = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
    const reviews = useSelector((state) => state.user.users)
    const [ video, setVideo ] = useState("https://res.cloudinary.com/codillionaire/video/upload/v1668959602/friends-academy/Reviewvideo_xpj3jk.mp4")
    const videos = [
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668959602/friends-academy/Reviewvideo_xpj3jk.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986675/friends-academy/TRIAL____________Videos_-_Wix.com_2_ubj7ps.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986675/friends-academy/TRIAL____________Videos_-_Wix.com_3_xa8oul.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986688/friends-academy/TRIAL____________Videos_-_Wix.com_8_s2hwzc.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986689/friends-academy/TRIAL____________Videos_-_Wix.com_7_rvydmj.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986691/friends-academy/TRIAL____________Videos_-_Wix.com_bv1l7f.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986692/friends-academy/TRIAL____________Videos_-_Wix.com_5_puqtnk.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986693/friends-academy/TRIAL____________Videos_-_Wix.com_6_bw3sdc.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986695/friends-academy/TRIAL____________Videos_-_Wix.com_10_e8pjai.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986697/friends-academy/TRIAL____________Videos_-_Wix.com_9_trrc3x.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986702/friends-academy/TRIAL____________Videos_-_Wix.com_14_hbzsnj.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986703/friends-academy/TRIAL____________Videos_-_Wix.com_11_jxrmft.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986706/friends-academy/TRIAL____________Videos_-_Wix.com_16_i3ensg.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986706/friends-academy/TRIAL____________Videos_-_Wix.com_15_frs8ek.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986707/friends-academy/TRIAL____________Videos_-_Wix.com_4_yyi3bb.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986708/friends-academy/TRIAL____________Videos_-_Wix.com_12_cttdah.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986709/friends-academy/TRIAL____________Videos_-_Wix.com_17_dgt9wo.mp4"},
        {src: "https://res.cloudinary.com/codillionaire/video/upload/v1668986712/friends-academy/TRIAL____________Videos_-_Wix.com_13_dzihld.mp4"},
    ]
    console.log(video)

  return (
    <div className='font-main flex flex-col justify-center items-center bg-servicesBG h-full  ' id='reviews'>

        <div ref={header}>
            <motion.div
            initial={{opacity: 0, scale: 0}}
            animate={isHeader && {opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className=" flex flex-col items-center mt-20"
            >
                <h1 className="text-3xl sm:text-4xl font-bold">Testimonials</h1>
                <div className="w-56 mt-2 flex items-center justify-center">
                    <div className="border-b-2 w-28 border-green"></div>
                    <div className='mx-3'>
                        <div className="h-2 w-2 rounded-full bg-pink"></div>
                    </div>
                    <div className="border-b-2 w-28 border-green"></div>
                </div>
            </motion.div>
        </div>

        <div className=' w-testimonialsContainer'>
            <Swiper
            style={{ '--swiper-navigation-color': 'black', '--swiper-navigation-size': '60px' }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={2}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
            speed={1000}
            pagination={{ clickable: true }}
            loop={true}
            >    
                {reviews && reviews.map((item) => {
                    return(
                        <SwiperSlide className='mt-5 py-10 px-5 mb-5 bg-white' key={item._id}>
                            <div className='flex flex-col flex-nowrap items-center shadow-gray shadow-2xl p-10'>
                                <div className='relative outline outline-3 outline-green rounded-full h-24 w-24 overflow-hidden mt-2'>
                                    <Image src={item.image} layout='fill' objectFit='cover'/>
                                </div>
                                <h1 className='mt-5 text-xl font-bold'>{item.username}</h1>
                                <p className='text-gray'>{item.desc}</p>
                                <Rating
                                readOnly
                                value={item.rating}
                                />
                                <div className='overflow-auto h-52 mt-4'>
                                    <p className='text-center text-lg mx-2'>{item.review}</p> 
                                </div> 
                            </div>                 
                        </SwiperSlide>
                    )
                })} 
            </Swiper>
        </div> 
        <div className='mt-10 bg-black border-4 border-green'>
            <video 
            className='h-96 w-courseWidth'
            controls         
            loop
            autoPlay
            poster="https://www.salesleadsinc.com/media/1419/customer-reviews.png"
            src={video} 
            >
            </video>
        </div>    
        <Swiper className='w-aboutWidth mt-10'
            style={{ '--swiper-navigation-color': 'black', '--swiper-navigation-size': '50px', '--swiper-navigation-margin': '50px' }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
            speed={1000}
            loop={true}
        >
            {
                videos.map((item) => {
                    return(
                        <SwiperSlide>
                            <div className='mx-3 cursor-pointer border-4 border-green h-60 overflow-hidden bg-black' onClick={() => setVideo(item.src)}>
                                <video  autoPlay muted loop className='-translate-y-20'>
                                    <source src={item.src} type="video/mp4"/>
                                </video>
                            </div>
                         </SwiperSlide>
                    )
                })
            }  
        </Swiper>
    </div>
  )
}

export default Testimonials