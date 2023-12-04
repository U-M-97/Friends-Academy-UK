import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Banner = () => {
  const banner = useSelector((state) => state.banner.banner);

  return (
    <div className="font-main flex justify-between items-center border-t bg-saleHeader border-lightGray px-2 sm:px-7">
      <div className="flex items-center justify-center sm:w-11/12 sm:h-10">
        <motion.p
          className="font-bold sm:text-xl bg-white rounded-full px-2 sm:px-4 flex"
          animate={{
            color: ["#000000", "#66ff99", "#000000"],
            scale: [0.9, 1, 0.9],
          }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <p>{banner.tag}</p>
        </motion.p>
        <motion.p
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="ml-5 sm:text-xl font-medium"
        >
          {banner.description}
        </motion.p>
      </div>
    </div>
  );
};

export default Banner;
