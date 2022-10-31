import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from "next/image"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import style from "../styles/testimonials.module.css"

const Testimonials = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
    const [index, setIndex] = useState(338)
    const [page, setPage] = useState(2)
    const [indexMobile, setIndexmobile] = useState(0)
    const [pageMobile, setPageMobile] = useState(1)
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

    const handleClick = (e) => {
        if(e == "left"){
            if(index == -302){
                console.log(index)
                setPage(4)
                return setIndex(1618)     
            }
            if(index == 1618){
                setPage(3)
            } else if(index == 978){
                setPage(2)
            } else if(index == 338){
                setPage(1)
            }
            setIndex((prev) => prev - 640)   
        }
        else if(e == "right"){
            if(index == 1618){
                console.log(index)
                setPage(1)
                return setIndex(-302)
            }
            if(index == -302){
                setPage(2)
            } else if(index == 338){
                setPage(3)
            } else if (index == 978){
                setPage(4)
            }
            setIndex((prev) => prev + 640)
        }
    }

    const handleClickMobile = (e) => {
        if(e == "left"){
            console.log(indexMobile)
            if(indexMobile == 0){
                setPageMobile(4)
                return setIndexmobile(1110)
            }
            if(indexMobile == 1110){
                setPageMobile(3)
            } else if (indexMobile == 740){
                setPageMobile(2)
            }
            else if (indexMobile == 370){
                setPageMobile(1)
            }
            setIndexmobile((prev) => prev - 370)
        }

        else if (e == "right"){
            if(indexMobile == 1110){
                setPageMobile(1)
                return setIndexmobile(0)
            }
            if(indexMobile == 0){
                setPageMobile(2)
            } else if (indexMobile == 370){
                setPageMobile(3)
            }
            else if (indexMobile == 740){
                setPageMobile(4)
            }
            setIndexmobile((prev) => prev + 370)
        }
    }

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
         
        <div className='w-screen h-full bg-bgServices flex justify-center overflow-x-hidden mt-5 sm:mt-20'>
            <div className='relative w-testimonialsContainer sm:px-20 pb-20 flex flex-col duration-300 overflow-x-hidden bg-bgServices '>
                <div className='flex p-5 sm:p-0 sm:mx-0 '>
                    {cards && cards.map((item) => {
                        return(
                            <>
                                <div className={`hidden sm:flex sm:flex-shrink-0 sm:flex-col sm:items-center sm:justify-center sm:w-testimonials sm:h-testimonials sm:rounded-md sm:shadow-gray sm:shadow-2xl sm:bg-white sm:p-10 sm:mx-5 `} style={index ? {transform: `translateX(${-index}px)`, transition: "1s ease"} : null}>
                                    <div className='relative border-2 border-green rounded-full h-24 w-24 overflow-hidden'>
                                        <Image src={item.img} layout='fill' objectFit='cover'/>
                                    </div>
                                    <h1 className='mt-5 text-xl font-bold'>{item.name}</h1>
                                    <p className='text-gray'>{item.desc}</p>
                                    <p className='mt-4 text-center text-lg'>{item.para}</p> 
                                </div>   

                                <div className='bg-white p-5 mr-5 w-full flex flex-col items-center justify-center shadow-2xl shadow-gray flex-shrink-0 sm:hidden' style={index ? {transform: `translateX(${-indexMobile}px)`, transition: "1s ease"} : null}>
                                    <div className='relative border-2 border-green rounded-full h-24 w-24 overflow-hidden'>
                                        <Image src={item.img} layout='fill' objectFit='cover'/>
                                    </div>
                                    <h1 className='mt-5 text-xl font-bold'>{item.name}</h1>
                                    <p className='text-gray'>{item.desc}</p>
                                    <p className='mt-4 text-center text-lg'>{item.para}</p> 
                                </div>
                            </>
                                    
                        )
                    })}
                </div>
                <div className='hidden sm:absolute sm:left-20 sm:top-48 sm:flex sm:justify-center sm:items-center sm:h-10 sm:w-10 sm:cursor-pointer sm:hover:scale-125 sm:duration-200' onClick={() => handleClick("left")}>
                    <ArrowBackIosIcon className=' scale-testimonialArrow ml-5'/>
                </div>
                <div className='hidden sm:absolute sm:right-20 sm:top-48 sm:flex sm:justify-center sm:items-center sm:h-10 sm:w-10 sm:cursor-pointer sm:hover:scale-125 sm:duration-200' onClick={() => handleClick("right")}>
                    <ArrowForwardIosIcon className=' scale-testimonialArrow'/>
                </div>  

                <div className='absolute top-60 flex justify-center items-center h-10 w-10 cursor-pointer duration-200 sm:hidden' onClick={() => handleClickMobile("left")}>
                    <ArrowBackIosIcon className=' scale-testimonialArrow ml-5'/>
                </div>
                <div className='absolute right-3 top-60 flex justify-center items-center h-10 w-10 cursor-pointer duration-200 sm:hidden' onClick={() => handleClickMobile("right")}>
                    <ArrowForwardIosIcon className=' scale-testimonialArrow ml-5'/>
                </div>
                
                <div className='hidden sm:flex  sm:items-center sm:justify-center sm:mt-14'>
                    <div className={`h-3 w-3 bg-white border border-black rounded-full mx-1 duration-300 ${page == 1 ? "bg-greenHover scale-125" : null}`}></div>
                    <div className={`h-3 w-3 bg-white border border-black rounded-full mx-1 duration-300 ${page == 2 ? "bg-greenHover scale-125 " : null}`}></div>
                    <div className={`h-3 w-3 bg-white border border-black rounded-full mx-1 duration-300 ${page == 3 ? "bg-greenHover scale-125" : null}`}></div>
                    <div className={`h-3 w-3 bg-white border border-black rounded-full mx-1 duration-300 ${page == 4 ? "bg-greenHover scale-125" : null}`}></div>
                </div>
                <div className='flex  items-center justify-center mt-5 sm:hidden'>
                    <div className={`h-3 w-3 bg-white border border-black rounded-full mx-1 duration-300 ${pageMobile == 1 ? "bg-green scale-125" : null}`}></div>
                    <div className={`h-3 w-3 bg-white border border-black rounded-full mx-1 duration-300 ${pageMobile == 2 ? "bg-green scale-125 " : null}`}></div>
                    <div className={`h-3 w-3 bg-white border border-black rounded-full mx-1 duration-300 ${pageMobile == 3 ? "bg-green scale-125" : null}`}></div>
                    <div className={`h-3 w-3 bg-white border border-black rounded-full mx-1 duration-300 ${pageMobile == 4 ? "bg-green scale-125" : null}`}></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonials