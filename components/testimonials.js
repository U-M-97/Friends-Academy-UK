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
    console.log(reviews)
    const [cards, setCards] = useState([
        {
            img: "/images/Emma Watson.jpg",
            name: "Emma Watson",
            desc: "British Actress",
            para: "Friends Academy has deﬁnitely been a game changer for me. Their perspective on things is so clear and they are so knowledgable that they taught me and showed me a totally new way to view myself and my own capabilities, and now I'm reaching goals within weeks that I thought would take me years."
        },
        {
            img: "/images/Elon Musk.jpg",
            name: "Elon Musk",
            desc: "CEO, TESLA USA",
            para: "Friends Academy has deﬁnitely been a game changer for me. Their perspective on things is so clear and they are so knowledgable that they taught me and showed me a totally new way to view myself and my own capabilities, and now I'm reaching goals within weeks that I thought would take me years."
        },
        {
            img: "/images/Tom Cruise.jpg",
            name: "Tom Cruise",
            desc: "American Actor",
            para: "Friends Academy has deﬁnitely been a game changer for me. Their perspective on things is so clear and they are so knowledgable that they taught me and showed me a totally new way to view myself and my own capabilities, and now I'm reaching goals within weeks that I thought would take me years."
        },
        {
            img: "/images/Emilia.jpg",
            name: "Emilia Clarke",
            desc: "British Actress",
            para: "Friends Academy has deﬁnitely been a game changer for me. Their perspective on things is so clear and they are so knowledgable that they taught me and showed me a totally new way to view myself and my own capabilities, and now I'm reaching goals within weeks that I thought would take me years."
        },
    ])

  return (
    <div className='font-main flex flex-col justify-center items-center bg-servicesBG h-full  overflow-hidden'>

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
            style={{ '--swiper-navigation-color': 'black' }}
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
                        <SwiperSlide className='py-10 px-5 mb-5'>
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
    </div>
  )
}

export default Testimonials