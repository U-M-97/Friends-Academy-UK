import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import WifiIcon from "@mui/icons-material/Wifi";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";

const Accommodation = () => {
  const { ref: header, inView: isHeader } = useInView({ triggerOnce: true });
  const { ref: accommodation, inView: isAccommodation } = useInView({
    triggerOnce: true,
  });
  const { ref: accommodation2, inView: isAccommodation2 } = useInView({
    triggerOnce: true,
  });

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: {
      x: -480,
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const item2 = {
    hidden: {
      x: 480,
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const images = [
    "/images/newRooms/1.jpg",
    "/images/newRooms/2.jpg",
    "/images/newRooms/3.jpg",
    "/images/newRooms/4.jpg",
    "/images/newRooms/5.jpg",
    "/images/newRooms/6.jpg",
    "/images/newRooms/7.jpg",
    "/images/newRooms/8.jpg",
    "/images/newRooms/9.jpg",
    "/images/newRooms/10.jpg",
    "/images/newRooms/11.jpg",
    "/images/newRooms/12.jpg",
    "/images/newRooms/13.jpg",
    "/images/newRooms/14.jpg",
    "/images/newRooms/15.jpg",
    "/images/newRooms/16.jpg",
    "/images/newRooms/17.jpg",
    "/images/newRooms/18.jpg",
    "/images/newRooms/19.jpg",
    "/images/newRooms/20.jpg",
    "/images/newRooms/21.jpg",
    "/images/newRooms/22.jpg",
    "/images/newRooms/23.jpg",
  ];

  return (
    <div
      className="font-main flex flex-col items-center overflow-hidden"
      id="accomodation"
    >
      <div ref={header}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isHeader && { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className=" flex flex-col items-center mt-20"
        >
          <h1 className="text-4xl font-bold">Accommodation</h1>
          <div className="w-56 mt-2 flex items-center justify-center">
            <div className="border-b-2 w-28 border-green"></div>
            <div className="mx-3">
              <div className="h-2 w-2 rounded-full bg-pink"></div>
            </div>
            <div className="border-b-2 w-28 border-green"></div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row w-full mt-10 sm:h-accommodation h-screen">
        <div
          ref={accommodation}
          className="sm:w-2/4 bg-black text-white flex items-center justify-center p-10 sm:p-0 order-last sm:order-first"
        >
          <motion.div
            className="flex flex-col justify-center"
            variants={container}
            initial="hidden"
            animate={isAccommodation && "visible"}
          >
            <motion.h1 variants={item} className="text-4xl font-medium">
              Single Rooms
            </motion.h1>
            <motion.p variants={item} className="text-xl text-green mt-4">
              GB 25.00 per person per night
            </motion.p>
            <motion.div variants={item} className="flex items-center mt-6 ">
              <HomeIcon className=" scale-125 text-green" />
              <p className="ml-4 text-lg">Onsite Accommodation Available</p>
            </motion.div>
            <motion.div variants={item} className="flex items-center mt-4">
              <WifiIcon className=" scale-125 text-green" />
              <p className="ml-4 text-lg">Free Wifi</p>
            </motion.div>
            <motion.div variants={item} className="flex items-center mt-4">
              <DirectionsCarIcon className=" scale-125 text-green" />
              <p className="ml-4 text-lg">
                Only 8 Minutes Drive to GMC Building
              </p>
            </motion.div>
            <motion.div variants={item} className="flex items-center mt-4">
              <LocalMallIcon className=" scale-125 text-green" />
              <p className="ml-4  text-lg">All Local Amenities Nearby</p>
            </motion.div>
            <motion.div variants={item} className="flex items-center mt-4">
              <RestaurantIcon className=" scale-125 text-green" />
              <p className="ml-4 text-lg">Halal Food At Walking Distance</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full h-full sm:w-3/4 relative bg-black">
          <Image
            src="/images/Single Room.jpeg"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:h-accommodation h-screen">
        <div className="w-full h-full sm:w-3/4 relative">
          <Image
            src="/images/Double Room.jpeg"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div
          ref={accommodation2}
          className="sm:w-2/4 bg-white flex justify-center items-center p-10 sm:p-0"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate={isAccommodation2 && "visible"}
            className="flex flex-col justify-center"
          >
            <motion.h1 variants={item2} className="text-4xl font-medium">
              Double Rooms
            </motion.h1>
            <motion.p variants={item2} className="text-xl mt-4 text-pink">
              GB 20.00 per person per night
            </motion.p>
            <motion.div variants={item2} className="flex items-center mt-6">
              <HomeIcon className=" scale-125 text-pink" />
              <p className="ml-4 text-lg">Onsite Accommodation Available</p>
            </motion.div>
            <motion.div variants={item2} className="flex items-center mt-4">
              <WifiIcon className=" scale-125 text-pink" />
              <p className="ml-4 text-lg">Free Wifi</p>
            </motion.div>
            <motion.div variants={item2} className="flex items-center mt-4">
              <DirectionsCarIcon className=" scale-125 text-pink" />
              <p className="ml-4 text-lg">
                Only 8 Minutes Drive to GMC Building
              </p>
            </motion.div>
            <motion.div variants={item2} className="flex items-center mt-4">
              <LocalMallIcon className=" scale-125 text-pink" />
              <p className="ml-4  text-lg">All Local Amenities Nearby</p>
            </motion.div>
            <motion.div variants={item2} className="flex items-center mt-4">
              <RestaurantIcon className=" scale-125 text-pink" />
              <p className="ml-4 text-lg">Halal Food At Walking Distance</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Swiper
        className="hidden sm:flex w-plabWidth mt-10 h-aboutPic"
        style={{
          "--swiper-navigation-color": "black",
          "--swiper-navigation-size": "50px",
          "--swiper-navigation-margin": "50px",
        }}
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={2}
        navigation
        speed={1000}
        loop={true}
        spaceBetween={40}
        autoplay={{
          disableOnInteraction: false,
        }}
      >
        {images &&
          images.map((image) => {
            return (
              <SwiperSlide key={item}>
                <div className=" relative border-8 border-green w-full h-full">
                  <Image src={image} layout="fill" objectFit="contain" />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Accommodation;
