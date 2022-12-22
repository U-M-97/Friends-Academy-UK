import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CancelIcon from '@mui/icons-material/Cancel';

const DiscountHeader = ({close}) => {

    const coupons = useSelector((state) => state.coupon.coupons)
    const [ outputs, setOutputs ] = useState({
        discount: "",
        discountOn: "",
        discountType: "",
    })
    
    useEffect(() => {
        coupons && coupons.find((coupon) => {
            if(coupon.discountOn === "All Courses"){
                return setOutputs((output) => ({...output, discount: coupon.discount, discountOn: coupon.discountOn, discountType: coupon.discountType}))
            }
        })
    },[])

  return (
    <div className="font-main flex justify-between items-center border-t bg-saleHeader border-lightGray px-7">
        {outputs && 
            <div className="flex items-center justify-center w-11/12 h-10">
                <motion.p className="font-bold text-xl bg-white rounded-full px-4"
                animate={{color: ["#000000", "#66ff99", "#000000",], scale: [0.9,1,0.9]}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear"}}
                >
                    SALE !
                </motion.p>
                <motion.p
                animate={{scale: [0.95,1,0.95]}}
                transition={{ repeat: Infinity, duration: 2, ease: "linear"}}
                className="ml-4 text-xl font-medium">{outputs.discount} {outputs.discountType} Discount on {outputs.discountOn}. Hurry up and Grab this limited offer right now</motion.p>
            </div>
        }
        <div className="cursor-pointer hover:text-white" onClick={close}>
         <CancelIcon/>  
        </div>
    </div>
  )
}

export default DiscountHeader