import Image from "next/image"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion"

const Slider = () => {

  const [ index, setIndex ] = useState(0)
  const images = [
    "/images/main.jpg", "/images/main2.jpg", "/images/main3.jpg"
  ]

  const handleArrow = (e) => {

    if(e=="left"){
      index !== 0 ? setIndex(index - 1) : setIndex(2)
    }
    else if(e=="right"){
      index !== 2 ? setIndex(index + 1) : setIndex(0)
    }
  }

  const slideShow = () => {
    if(index == 2){
      setIndex(0)
    }
    else{
      setIndex(index + 1)
    }
  }

  useEffect(() => {

    const timer = setTimeout(() => {
      slideShow()
    }, 3000)

    return () => clearTimeout(timer)

  }, [index])

  return (
    <div className="relative mt-4 h-slider overflow-hidden font-main">
        <div className="w-full absolute bg-black h-full top-0 bottom-0 left-0 right-0 z-10 opacity-30"></div>
        <div className="flex h-full w-picturesWrapper duration-1000 ease-in-out" style={{transform: `translateX(${-100*index}vw)`}}>       
            {images.map((img, i) => {
              return(
                <div className="w-screen relative h-full" key={i}>
                  <Image src={img} alt="image" layout="fill" objectFit="cover"/>
                </div>
              )
            })}      
        </div>
        <div className="h-20 w-10 flex items-center justify-center absolute top-56 bottom-0 left-20  text-white cursor-pointer hover:text-green z-20" onClick={() => handleArrow("left")}>
            <ArrowBackIosIcon className="scale-arrow ml-8"/>
        </div>
        <div className="h-20 w-10 flex items-center justify-center absolute top-56 bottom-0 right-20  text-white cursor-pointer hover:text-green z-20" onClick={() => handleArrow("right")}>
            <ArrowForwardIosIcon className="scale-arrow"/>
        </div>

        <motion.div className="absolute top-16 left-1/2 w-box rounded-lg bg-white z-30 p-12 flex flex-col"
          animate={{scale: 1, opacity: 1}}
          initial={{scale: 0.5, opacity: 0}}
          transition={{
          type: "spring", duration: 2
          }}
        >
            <h1 className="text-4xl font-extrabold">No matter how good you are at anything a Coach makes you better</h1>
            <div className="mt-10 flex justify-between">
              <input className="border-lightGray border p-4 rounded-md" placeholder="Your Name"/>
              <input className="border-lightGray border p-4 rounded-md" placeholder="Your Email"/>
            </div>
            <button className="bg-green p-5 text-white font-bold mt-10 text-xl rounded-md hover:bg-pink duration-300">Subscribe Now</button>
        </motion.div> 
    </div>
  )
}

export default Slider